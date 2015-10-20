# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  default_scope { order('name ASC') }

  has_many :taggings, dependent: :destroy
  has_many :posts, through: :taggings
end
