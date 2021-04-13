class ExamsController < ApplicationController
  before_action :find_course, only: [:new, :show]
  before_action :find_exam, only: [:show]
  before_action :logged_in_user, only: [:create, :index, :new, :show]
  def new
    @exam = Exam.new 
    for i in 1..@course.questions.count
      @exam.results.build
    end

    @questions = @course.questions

  end

  def index
    @pagy, @exams = pagy(current_user.exams, items: 10)
  end

  def create
    
    @exam = current_user.exams.new exam_params
    if @exam.save!
     flash[:success]="exam created!"
     redirect_to course_exam_path(@exam.course_id,@exam)
     else
      flash[:danger]="Creating examanswer fail!"
      render :new
    end
  end

  def show
    # Solution result
    @questions = @course.questions
    @question_number = @questions.count
    @number_correct = Exam.last.answers.where(is_correct: true).count
    if @number_correct >= (@question_number*0.8)
      @pass_or_fail = "PASSED: #{@number_correct}/#{@question_number}"
    else
      @pass_or_fail = "FAIL: #{@number_correct}/#{@question_number}"
    end
  end

  private
  def find_course
    @course = Course.find_by id: params[:course_id]
    unless @course.present?
     flash[:success] = "Course doesn't exist"
     redirect_to root_path
   end
  end

  def exam_params
    params.require(:exam).permit(:exam_name, :course_id, :user_id,  :results_attributes => [:question_id, :answer_id])
  end

  def find_exam
    @exam = Exam.find_by id: params[:id]
    unless @exam.present?
     flash[:success] = "Exam doesn't exist"
     redirect_to root_path
   end
  end

  def logged_in_user
    unless current_user.present?
      flash[:danger] = "Please log in."
      redirect_to courses_path
    end
  end

end