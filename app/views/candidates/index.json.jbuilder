json.array!(@candidates) do |candidate|
  json.extract! candidate, :id, :name, :party_id, :betfaircode, :primaryodds, :presidencyodds
  json.url candidate_url(candidate, format: :json)
end
