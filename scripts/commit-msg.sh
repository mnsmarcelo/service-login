#!/bin/bash
#
# Automatically adds branch name and branch description to every commit message.
# Modified from github comment here https://github.com/typicode/husky/issues/311#issuecomment-401878181
#

# This way you can customize which branches should be skipped when
# prepending commit message.
if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master develop)
fi

# Get branch name and description
BRANCH_NAME=$(git branch | grep '*' | sed 's/* //')

# Branch name should be excluded from the prepend
BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_NAME$")

# A developer has already prepended the commit
BRANCH_IN_COMMIT=$(grep -c "$BRANCH_NAME" ".git/COMMIT_EDITMSG")

if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $BRANCH_IN_COMMIT -ge 1 ]]; then 
  sed -i.bak -e "1s/^/$BRANCH_NAME /" ".git/COMMIT_EDITMSG"
fi
