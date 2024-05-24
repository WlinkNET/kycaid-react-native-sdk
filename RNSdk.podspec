require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNSdk"
  s.version      = package["version"]
  s.summary      = package["description"]

  s.homepage     = "https://github.com/WlinkNET/kycaid-react-native-sdk"
  s.license      = "MIT"
  s.authors      = { "kycaid" => "info@kycaid.com" }
  s.platforms    = { :ios => "10.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/WlinkNET/kycaid-react-native-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/Sdk/**/*.{h,m,swift}"
  s.dependency "React"
end
