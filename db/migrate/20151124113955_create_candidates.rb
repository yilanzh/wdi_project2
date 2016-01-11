class CreateCandidates < ActiveRecord::Migration
  def change
    create_table :candidates do |t|
      t.string :name
      t.references :party, index: true, foreign_key: true
      t.string :betfaircode
      t.float :primaryodds
      t.float :presidencyodds

      t.timestamps null: false
    end
  end
end
