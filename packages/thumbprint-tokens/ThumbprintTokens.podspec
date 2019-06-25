require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name                  = 'ThumbprintTokens'
  s.version               = package['version']
  s.summary               = package['description']
  s.homepage              = package['homepage']
  s.license               = { :type => package['license'], :file => 'LICENSE.txt'  }
  s.author                = { 'Daniel O\'Connor' => 'doconnor@thumbtack.com' }
  s.source                = { :http => "https://unpkg.com/@thumbtack/thumbprint-tokens@#{s.version.to_s}/dist/ios.zip" }
  s.source_files          = 'index.swift'
  s.swift_versions        = ['5.0']
  s.ios.deployment_target = '10.3'
end
