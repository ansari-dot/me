import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Screening = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    q1: "",
    q2: "",
    q3: ""
  });
  const [quizResult, setQuizResult] = useState(null);
  const [showQuizButton, setShowQuizButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 1) {
      setShowQuizButton(false);
      const timer = setTimeout(() => setShowQuizButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const correctAnswers = {
    q1: "b",
    q2: "b",
    q3: "a"
  };

  const startQuiz = () => {
    setCurrentStep(2);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    for (const question in correctAnswers) {
      if (quizAnswers[question] === correctAnswers[question]) {
        score++;
      }
    }
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;
    setQuizResult({ score, percentage, passed });
    setCurrentStep(3);
  };

  const retryQuiz = () => {
    setQuizAnswers({ q1: "", q2: "", q3: "" });
    setQuizResult(null);
    setCurrentStep(2);
  };

  const getInstructionText = () => {
    switch (currentStep) {
      case 1: return "Please watch the training video carefully.";
      case 2: return "Complete the screening quiz to finish.";
      case 3: return "Results are ready.";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container" style={{ marginTop: 40, paddingBottom: 40 }}>
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          {quizResult && quizResult.percentage > 80 && (
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={false} />
          )}
          <div className="shadow-lg rounded-4 border border-2" style={{ margin: '0 auto', padding: '2.5rem 2rem', minHeight: 520, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)' }}>
            {/* Progress Tracker */}
            {(!quizResult) && (
              <>
                <h1 className="text-center fs-2 fw-bold mb-2" style={{color: '#0C3C78', letterSpacing: 1}}>
                  Welcome to Shehrity Employee Screening
                </h1>
                <p className="text-center text-secondary mb-4" style={{fontSize: 18, marginBottom: 32}}>
                  {getInstructionText()}
                </p>
                <div className="d-flex justify-content-between position-relative" style={{gap: 24, marginTop: 64, marginBottom: 40}}>
                  <div className={`text-center flex-fill progress-step ${currentStep >= 1 ? 'active' : 'text-secondary'}`} style={{color: currentStep >= 1 ? '#0C3C78' : '#aaa', fontWeight: currentStep >= 1 ? 700 : 400, fontSize: 16, padding: '18px 0'}}>
                    <div style={{marginTop: 48}}>Step 1: Training</div>
                  </div>
                  <div className={`text-center flex-fill progress-step ${currentStep >= 2 ? 'active' : 'text-secondary'}`} style={{color: currentStep >= 2 ? '#0C3C78' : '#aaa', fontWeight: currentStep >= 2 ? 700 : 400, fontSize: 16, padding: '18px 0'}}>
                    <div style={{marginTop: 48}}>Step 2: Quiz</div>
                  </div>
                  <div className={`text-center flex-fill progress-step ${currentStep >= 3 ? 'active' : 'text-secondary'}`} style={{color: currentStep >= 3 ? '#0C3C78' : '#aaa', fontWeight: currentStep >= 3 ? 700 : 400, fontSize: 16, padding: '18px 0'}}>
                    <div style={{marginTop: 48}}>Step 3: Results</div>
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Training */}
            {currentStep === 1 && (
              <section>
                <h2 className="fs-4 fw-semibold text-center mb-4" style={{color: '#123E7C'}}>Step 1: Training Video</h2>
                <div className="position-relative mb-4 ratio ratio-16x9 bg-dark rounded-4 overflow-hidden" style={{boxShadow: '0 4px 24px rgba(12,60,120,0.08)'}}>
                  <iframe
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                    src="https://player.vimeo.com/video/VIDEO_ID"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text-center">
                  <button 
                    onClick={startQuiz} 
                    className="btn w-100 fw-bold"
                    style={{backgroundColor: showQuizButton ? '#801515' : '#ccc', borderColor: '#801515', color: '#fff', fontSize: 18, borderRadius: 12, padding: '12px 0', transition: 'background 0.2s'}} 
                    disabled={!showQuizButton}
                  >
                    {showQuizButton ? 'Next Step: Proceed to Quiz' : 'Please watch the video...'}
                  </button>
                </div>
              </section>
            )}

            {/* Step 2: Quiz */}
            {currentStep === 2 && (
              <section>
                <h2 className="fs-4 fw-semibold text-center mb-4" style={{color: '#123E7C'}}>Step 2: Screening Quiz</h2>
                <form onSubmit={handleQuizSubmit} className="d-flex flex-column gap-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <p className="fw-medium mb-3">1. What is the first responsibility of a security guard?</p>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q1"
                          id="q1b"
                          value="b"
                          checked={quizAnswers.q1 === "b"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                          required
                        />
                        <label className="form-check-label" htmlFor="q1b">
                          To observe and report
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q1"
                          id="q1a"
                          value="a"
                          checked={quizAnswers.q1 === "a"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q1a">
                          To act aggressively
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q1"
                          id="q1c"
                          value="c"
                          checked={quizAnswers.q1 === "c"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q1c">
                          To carry a weapon
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 border">
                    <p className="fw-medium mb-3">2. What should a guard do in case of fire?</p>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q2"
                          id="q2b"
                          value="b"
                          checked={quizAnswers.q2 === "b"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                          required
                        />
                        <label className="form-check-label" htmlFor="q2b">
                          Alert authorities and follow emergency protocol
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q2"
                          id="q2a"
                          value="a"
                          checked={quizAnswers.q2 === "a"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q2a">
                          Panic and run
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q2"
                          id="q2c"
                          value="c"
                          checked={quizAnswers.q2 === "c"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q2c">
                          Leave the site
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 border">
                    <p className="fw-medium mb-3">3. Which of these is NOT allowed for an unarmed guard?</p>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q3"
                          id="q3a"
                          value="a"
                          checked={quizAnswers.q3 === "a"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q3: e.target.value})}
                          required
                        />
                        <label className="form-check-label" htmlFor="q3a">
                          Carrying a firearm
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q3"
                          id="q3b"
                          value="b"
                          checked={quizAnswers.q3 === "b"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q3: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q3b">
                          Monitoring CCTV
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="q3"
                          id="q3c"
                          value="c"
                          checked={quizAnswers.q3 === "c"}
                          onChange={(e) => setQuizAnswers({...quizAnswers, q3: e.target.value})}
                        />
                        <label className="form-check-label" htmlFor="q3c">
                          Checking IDs
                        </label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold" style={{backgroundColor: '#0C3C78', borderColor: '#0C3C78', color: '#fff', fontSize: 18, borderRadius: 12, padding: '12px 0'}}>Submit Quiz</button>
                </form>
              </section>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && quizResult && (
              <section>
                <h2 className="fs-4 fw-semibold text-center mb-4" style={{color: quizResult.passed ? '#198754' : '#801515'}}>
                  Quiz Results
                </h2>
                <div className="text-center">
                  {quizResult.passed ? (
                    <div className="fs-3 fw-bold text-success mb-3">
                      Congratulations! You passed the exam.
                    </div>
                  ) : (
                    <div className="fs-3 fw-bold text-danger mb-3">
                      Sorry, you failed. Please try again.
                    </div>
                  )}
                  <div className="fs-5 mb-4">
                    Your Score: {quizResult.score}/3 ({Math.round(quizResult.percentage)}%)
                  </div>
                  {!quizResult.passed && (
                    <button 
                      onClick={retryQuiz} 
                      className="btn btn-secondary w-100 mt-3 fw-bold" 
                      style={{backgroundColor: '#801515', borderColor: '#801515', color: '#fff', fontSize: 16, borderRadius: 12}}>
                      Retry Quiz
                    </button>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screening;