workflow "Build, Test, and Publish" {
  on = "push"
  # resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build"
}

# Filter for master branch
action "Master" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

# action "Publish" {
  # needs = "Master"
  # uses = "actions/npm@master"
  # args = "publish --access public"
  # secrets = ["NPM_TOKEN"]
# }
