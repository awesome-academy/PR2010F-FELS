class Question < ApplicationRecord
	searchkick
	has_many :results
	has_many :exams, through: :results
	has_many :answers, dependent: :destroy
	belongs_to :course
	validates :question_name, presence: true
	delegate :course_name, to: :course, prefix: :co, allow_nil: true
	accepts_nested_attributes_for :answers,
	reject_if: proc {|attribute| attribute[:answer_content].blank?}
end