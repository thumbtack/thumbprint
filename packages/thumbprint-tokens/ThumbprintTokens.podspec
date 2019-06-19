Pod::Spec.new do |s|
  s.name             = 'ThumbprintTokens'
  s.version          = '0.1.0-beta.0'
  s.summary          = 'Design variables that power Thumbtack’s UI.'
  s.homepage         = 'https://thumbprint.design/tokens'
  s.license          = { :type => 'Apache-2.0', :file => '../../LICENSE'  }
  s.author           = { 'Daniel O\'Connor' => 'doconnor@thumbtack.com' }
  s.source           = { :git => 'https://github.com/thumbtack/thumbprint.git', :tag => s.version.to_s }

  s.swift_versions = ['5.0']
  s.ios.deployment_target = '10.3'

  s.source_files = 'dist/ios/index.swift'
end
