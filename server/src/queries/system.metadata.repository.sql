-- NOTE: This file is auto generated by ./sql-generator

-- SystemMetadataRepository.get
select
  "value"
from
  "system_metadata"
where
  "key" = $1

-- SystemMetadataRepository.set
insert into
  "system_metadata" ("key", "value")
values
  ($1, $2)
on conflict ("key") do update
set
  "value" = $3

-- SystemMetadataRepository.delete
delete from "system_metadata"
where
  "key" = $1
