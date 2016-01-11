json.array!(@parties) do |party|
  json.extract! party, :id, :name, :betfaircode, :odds
  json.url party_url(party, format: :json)
end
