#!/bin/sh
set -e

mongosh <<EOF
use admin
db.auth("root", "13579")
db.createUser(
  {
    user: "minhvb",
    pwd: "example",
    roles: [{role: "userAdminAnyDatabase", db: "admin"}, "readWriteAnyDatabase"]
  }
)

use realestatedoc
db.createCollection("demo")
db.demo.insert({"name": "minh"})
EOF