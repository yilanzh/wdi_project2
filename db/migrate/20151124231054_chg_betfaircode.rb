class ChgBetfaircode < ActiveRecord::Migration
  def change
    execute 'ALTER TABLE "parties" ALTER COLUMN "betfaircode" TYPE integer USING betfaircode::integer'
    execute 'ALTER TABLE "candidates" ALTER COLUMN "betfaircode" TYPE integer USING betfaircode::integer'
  end
end
