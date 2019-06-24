require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'packages/thumbprint-tokens/package.json')))

Pod::Spec.new do |s|
  s.name               = 'ThumbprintTokens'
  s.version            = package['version']
  s.summary            = package['description']
  s.homepage           = package['homepage']
  s.license            = { :type => package['license'], :file => 'LICENSE'  }
  s.author             = { 'Daniel O\'Connor' => 'doconnor@thumbtack.com' }
  s.source             = { :git => 'https://github.com/thumbtack/thumbprint.git', :tag => "@thumbtack/thumbprint-tokens@#{s.version.to_s}" }
  s.prepare_command    = "mkdir -p packages/thumbprint-tokens/dist/ios && curl https://unpkg.com/@thumbtack/thumbprint-tokens@#{s.version.to_s}/dist/ios/index.swift --fail > packages/thumbprint-tokens/dist/ios/index.swift"

  s.swift_versions = ['5.0']
  s.ios.deployment_target = '10.3'

  s.source_files = 'packages/thumbprint-tokens/dist/ios/index.swift'
end
