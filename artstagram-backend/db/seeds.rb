require 'rest-client'

pics = [
  335536,
  336318,
  336327,
  335537,
  335538,
  459193,
  437980,
  436524,
  436527,
  436530,
  436528,
  436531,
  436533,
  436535,
  436536,
  437984,
  436529,
  436526,
  436525,
  436534,
  437998,
  436532,
  438722,
  459123
]

def createPics(picData)
  Picture.create(url: picData)
end

pics.each do |objectID|
   m = RestClient.get "https://collectionapi.metmuseum.org/public/collection/v1/objects/#{objectID}"
   m_object = JSON.parse(m)
   createPics(m_object["primaryImageSmall"])
end
