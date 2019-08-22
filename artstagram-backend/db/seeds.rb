require 'rest-client'

pics = [
  335536,
  336327,
  437980,
  436527,
  436531,
  437984,
  436529,
  436525,
  436534,
  436532,
  438722,
  459123
]

def createPics(url, title)
  Picture.create(url: url, title: title)
end

pics.each do |objectID|
   m = RestClient.get "https://collectionapi.metmuseum.org/public/collection/v1/objects/#{objectID}"
   m_object = JSON.parse(m)
   createPics(m_object["primaryImageSmall"], m_object["title"])
end

User.create(name: 'Laurell')
User.create(name: 'John')
