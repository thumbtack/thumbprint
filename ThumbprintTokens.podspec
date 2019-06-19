Pod::Spec.new do |s|
  s.name               = 'ThumbprintTokens'
  s.version            = '0.1.0-beta.0'
  s.summary            = 'Design variables that power Thumbtack’s UI.'
  s.homepage           = 'https://thumbprint.design/tokens'
  s.license            = { :type => 'Apache-2.0', :file => 'LICENSE'  }
  s.author             = { 'Daniel O\'Connor' => 'doconnor@thumbtack.com' }
  # s.source           = { :git => 'https://github.com/thumbtack/thumbprint.git', :tag => "@thumbtack/thumbprint-tokens@#{s.version.to_s}" }
  s.source             = { :git => 'https://github.com/thumbtack/thumbprint.git', :tag => "@thumbtack/thumbprint-tokens@0.1.0-beta.0" }
  s.prepare_command    = 'mkdir -p packages/thumbprint-tokens/dist/ios && curl https://unpkg.com/@thumbtack/thumbprint-tokens@8.1.0-beta.0/dist/ios/index.swift > packages/thumbprint-tokens/dist/ios/index.swift'

  s.swift_versions = ['5.0']
  s.ios.deployment_target = '10.3'

  s.source_files = 'packages/thumbprint-tokens/dist/ios/index.swift'
end
