log_level          :info
log_location       STDOUT
file_cache_path    File.expand_path(File.join(File.dirname(__FILE__), 'chef-tmp')) # '/var/chef/cookbooks'
cookbook_path      [ File.expand_path(File.join(File.dirname(__FILE__), 'cookbooks')), 
                     File.expand_path(File.join(File.dirname(__FILE__), 'site-cookbooks')) ]


