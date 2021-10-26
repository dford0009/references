#!/usr/bin/env ruby
#
# Use this file to recursively bump package versions in
# all `package.json` files in directories below this one.
#
# Written to bump Babel minor versions.
#
# You must have `npm-check-updates` installed. That tool
# is quite powerful. See the docs for all the options
# to tweak the command below to your content.

UPDATE_COMMAND = 'ncu "/^react(-dom)?/" -u'

require 'open3'

def open_and_update_dir(dir)
  return if dir.match(/node_modules/)

  if File.directory?(dir)
    dirs = Dir[File.join(dir,'*')]
    while d = dirs.pop do
      open_and_update_dir(d)
    end
  elsif dir.match(/package.json$/)
    dir = File.dirname(dir)
    puts "Updating #{dir}..."
    system """
      cd #{dir} && #{UPDATE_COMMAND}
    """
  end
end

dir = File.dirname(__FILE__)

open_and_update_dir(dir)