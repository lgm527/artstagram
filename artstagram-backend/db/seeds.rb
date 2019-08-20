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

pics.each do |objectID|
   fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/#{objectID}`)
   .then(res => res.json())
   .then(createPics)
end

function createPics(picData){
  Picture.create(url: picData.primaryImageSmall);
}
