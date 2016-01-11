class Service
	def self.update
		# login to betfair
		require 'betfair'
		# # create a client with app code
		client = Betfair::Client.new("X-Application" => ENV["CLIENTCODE"])
		# # let's log in.
		client.interactive_login(ENV["USERNAME"], ENV["PASSWORD"])

		# get book for party market
		party_book = client.list_market_book("marketIds": ["1.116006120"])

		# get runners form party_book
		partyrunners = party_book[0]["runners"]

		# Democratic Nominee
		dem_book = client.list_market_book("marketIds": ["1.107664930"])

		# Republican Nominee
		rep_book = client.list_market_book("marketIds": ["1.107664938"])


		# add dem and rep books to get a big list of all primary odds
		big_book = dem_book[0]["runners"] + rep_book[0]["runners"]

		# get market book for presidentual election
		pres_book = client.list_market_book("marketIds": ["1.107373419"])

		# get list of runners from pres_book
		pres_runners = pres_book[0]["runners"]

		# get partys from db, find in party runners by selectionid, update odds and save to db
		Party.all.each do |party|
			partycode = party.betfaircode
			selection = partyrunners.select {|selection| selection["selectionId"] == partycode.to_i }
			party.odds = selection[0]["lastPriceTraded"]
			party.save

		end

		# get candidates from db, find in pbig_book for primary odds and pre_runners for presidency odds, update odds and save to db
		Candidate.all.each do |candidate|
			candicode = candidate.betfaircode

			selection = big_book.select {|selection| selection["selectionId"] == candicode.to_i }
			candidate.primaryodds = selection[0]["lastPriceTraded"]

			selection = pres_runners.select {|selection| selection["selectionId"] == candicode.to_i }
			candidate.presidencyodds = selection[0]["lastPriceTraded"]

			candidate.save
		end
	end
end