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

User.create(name: 'Laurell');
User.create(name: 'John');

Comment.create(picture_id: 1, user_id: 1, content: 'First comment!')
Comment.create(picture_id: 1, user_id: 2, content: 'My all-time favorite!')
Comment.create(picture_id: 1, user_id: 2, content: 'This changed my life')
Comment.create(picture_id: 1, user_id: 1, content: 'I love this')