require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name                  = 'ThumbprintTokens'
  s.version               = package['version']
  s.summary               = package['description']
  s.homepage              = package['homepage']
  s.author                = { 'Daniel O\'Connor' => 'doconnor@thumbtack.com' }

  # We grab the asset from unpkg, a CDN that hosts our NPM `dist` files. The `ios.zip` file
  # contains two files: `index.swift` and `LICENSE.txt`.
  s.source                = { :http => "https://unpkg.com/@thumbtack/thumbprint-tokens@#{s.version.to_s}/dist/ios.zip" }
  s.source_files          = 'ThumbprintTokens.swift'
  s.license               = { :type => package['license'], :file => 'LICENSE.txt'  }

  s.swift_versions        = ['5.0']
  s.ios.deployment_target = '10.3'
end
