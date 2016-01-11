# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Candidate.destroy_all
Party.destroy_all


# party1 = Party.create(name: "A", odds: 1.5)
# party2 = Party.create(name: "B", odds: 1.6)

# candi1 = Candidate.create(name: "C1", party_id: party1.id, presidencyodds: 1.1, primaryodds: 1.2)
# candi2 = Candidate.create(name: "C2", party_id: party2.id, presidencyodds: 2.1, primaryodds: 2.2)
# candi3 = Candidate.create(name: "C3", party_id: party1.id, presidencyodds: 3.1, primaryodds: 3.2)



party1 = Party.create(name: "Democrats", odds: 1.7, betfaircode: 1171581)
party2 = Party.create(name: "Republicans", odds: 2.4, betfaircode: 1171580)


candi1 = Candidate.create(name: "Hillary Clinton", party_id: party1.id, presidencyodds: 1.80, primaryodds: 1.10, betfaircode: 1171623)
candi2 = Candidate.create(name: "Marco Rubio", party_id: party2.id, presidencyodds: 5.0, primaryodds: 2.4, betfaircode: 5075277)
candi3 = Candidate.create(name: "Donald Trump", party_id: party2.id, presidencyodds: 11.0, primaryodds: 5.5, betfaircode: 5242353)
candi4 = Candidate.create(name: "Bernie Sanders", party_id: party1.id, presidencyodds: 32.0, primaryodds: 16.5, betfaircode: 6761309)
candi5 = Candidate.create(name: "Jeb Bush", party_id: party2.id, presidencyodds: 26.0, primaryodds: 11.0, betfaircode: 1171599)
candi6 = Candidate.create(name: "Ted Cruz", party_id: party2.id, presidencyodds: 16.0, primaryodds: 7.0, betfaircode: 6886678)
candi7 = Candidate.create(name: "Ben Carson", party_id: party2.id, presidencyodds: 95, primaryodds: 36, betfaircode: 8469645)
candi8 = Candidate.create(name: "Chris Christie", party_id: party2.id, presidencyodds: 55.0, primaryodds: 29.0, betfaircode: 5012997)



# [["Hillary Clinton", 1.85, 1.12, 1171623], ["Marco Rubio", 5.8, 2.56, 5075277], ["Donald Trump", 10.0, 5.0, 5242353], ["Bernie Sanders", 30.0, 16.5, 6761309], ["Jeb Bush", 26.0, 11.0, 1171599], ["Ted Cruz", 16.0, 7.0, 6886678], ["Ben Carson", 95.0, 36.0, 8469645], ["Chris Christie", 55.0, 29.0, 5012997]