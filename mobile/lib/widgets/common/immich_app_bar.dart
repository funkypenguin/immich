import 'package:auto_route/auto_route.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/extensions/build_context_extensions.dart';
import 'package:immich_mobile/models/backup/backup_state.model.dart';
import 'package:immich_mobile/models/server_info/server_info.model.dart';
import 'package:immich_mobile/providers/backup/backup.provider.dart';
import 'package:immich_mobile/providers/cast.provider.dart';
import 'package:immich_mobile/providers/server_info.provider.dart';
import 'package:immich_mobile/providers/user.provider.dart';
import 'package:immich_mobile/routing/router.dart';
import 'package:immich_mobile/widgets/asset_viewer/cast_dialog.dart';
import 'package:immich_mobile/widgets/common/app_bar_dialog/app_bar_dialog.dart';
import 'package:immich_mobile/widgets/common/user_circle_avatar.dart';

class ImmichAppBar extends ConsumerWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
  final List<Widget>? actions;
  final bool showUploadButton;

  const ImmichAppBar({super.key, this.actions, this.showUploadButton = true});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final BackUpState backupState = ref.watch(backupProvider);
    final bool isEnableAutoBackup = backupState.backgroundBackup || backupState.autoBackup;
    final ServerInfo serverInfoState = ref.watch(serverInfoProvider);
    final user = ref.watch(currentUserProvider);
    final isDarkTheme = context.isDarkTheme;
    const widgetSize = 30.0;
    final isCasting = ref.watch(castProvider.select((c) => c.isCasting));

    buildProfileIndicator() {
      return InkWell(
        onTap: () =>
            showDialog(context: context, useRootNavigator: false, builder: (ctx) => const ImmichAppBarDialog()),
        borderRadius: const BorderRadius.all(Radius.circular(12)),
        child: Badge(
          label: Container(
            decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(widgetSize / 2)),
            child: const Icon(Icons.info, color: Color.fromARGB(255, 243, 188, 106), size: widgetSize / 2),
          ),
          backgroundColor: Colors.transparent,
          alignment: Alignment.bottomRight,
          isLabelVisible:
              serverInfoState.isVersionMismatch || ((user?.isAdmin ?? false) && serverInfoState.isNewReleaseAvailable),
          offset: const Offset(-2, -12),
          child: user == null
              ? const Icon(Icons.face_outlined, size: widgetSize)
              : Semantics(
                  label: "logged_in_as".tr(namedArgs: {"user": user.name}),
                  child: UserCircleAvatar(radius: 17, size: 31, user: user),
                ),
        ),
      );
    }

    getBackupBadgeIcon() {
      final iconColor = isDarkTheme ? Colors.white : Colors.black;

      if (isEnableAutoBackup) {
        if (backupState.backupProgress == BackUpProgressEnum.inProgress) {
          return Container(
            padding: const EdgeInsets.all(3.5),
            child: CircularProgressIndicator(
              strokeWidth: 2,
              strokeCap: StrokeCap.round,
              valueColor: AlwaysStoppedAnimation<Color>(iconColor),
              semanticsLabel: 'backup_controller_page_backup'.tr(),
            ),
          );
        } else if (backupState.backupProgress != BackUpProgressEnum.inBackground &&
            backupState.backupProgress != BackUpProgressEnum.manualInProgress) {
          return Icon(
            Icons.check_outlined,
            size: 9,
            color: iconColor,
            semanticLabel: 'backup_controller_page_backup'.tr(),
          );
        }
      }

      if (!isEnableAutoBackup) {
        return Icon(
          Icons.cloud_off_rounded,
          size: 9,
          color: iconColor,
          semanticLabel: 'backup_controller_page_backup'.tr(),
        );
      }
    }

    buildBackupIndicator() {
      final indicatorIcon = getBackupBadgeIcon();
      final badgeBackground = context.colorScheme.surfaceContainer;

      return InkWell(
        onTap: () => context.pushRoute(const BackupControllerRoute()),
        borderRadius: const BorderRadius.all(Radius.circular(12)),
        child: Badge(
          label: Container(
            width: widgetSize / 2,
            height: widgetSize / 2,
            decoration: BoxDecoration(
              color: badgeBackground,
              border: Border.all(color: context.colorScheme.outline.withValues(alpha: .3)),
              borderRadius: BorderRadius.circular(widgetSize / 2),
            ),
            child: indicatorIcon,
          ),
          backgroundColor: Colors.transparent,
          alignment: Alignment.bottomRight,
          isLabelVisible: indicatorIcon != null,
          offset: const Offset(-2, -12),
          child: Icon(Icons.backup_rounded, size: widgetSize, color: context.primaryColor),
        ),
      );
    }

    return AppBar(
      backgroundColor: context.themeData.appBarTheme.backgroundColor,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
      automaticallyImplyLeading: false,
      centerTitle: false,
      title: Builder(
        builder: (BuildContext context) {
          return Row(
            children: [
              Builder(
                builder: (context) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 3.0),
                    child: SvgPicture.asset(
                      context.isDarkTheme
                          ? 'assets/immich-logo-inline-dark.svg'
                          : 'assets/immich-logo-inline-light.svg',
                      height: 40,
                    ),
                  );
                },
              ),
            ],
          );
        },
      ),
      actions: [
        if (actions != null)
          ...actions!.map((action) => Padding(padding: const EdgeInsets.only(right: 16), child: action)),
        if (kDebugMode || kProfileMode)
          IconButton(
            icon: const Icon(Icons.science_rounded),
            onPressed: () => context.pushRoute(const FeatInDevRoute()),
          ),
        if (isCasting)
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: IconButton(
              onPressed: () {
                showDialog(context: context, builder: (context) => const CastDialog());
              },
              icon: Icon(isCasting ? Icons.cast_connected_rounded : Icons.cast_rounded),
            ),
          ),
        if (showUploadButton) Padding(padding: const EdgeInsets.only(right: 20), child: buildBackupIndicator()),
        Padding(padding: const EdgeInsets.only(right: 20), child: buildProfileIndicator()),
      ],
    );
  }
}
