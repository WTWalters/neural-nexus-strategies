"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  dimension: {
    id: number;
    name: string;
    display_name: string;
    icon: string;
  };
  text: string;
  help_text: string;
  order: number;
}

interface AssessmentWizardProps {
  assessmentType: "QUICK" | "COMPREHENSIVE";
}

export default function AssessmentWizard({ assessmentType }: AssessmentWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentDimension, setCurrentDimension] = useState<number | null>(null);
  const [dimensionQuestions, setDimensionQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState(0);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState({
    organization_name: "",
    email: "",
    industry: "",
    company_size: ""
  });
  
  // Fetch dimensions and questions
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Set up default data in case fetching fails
        let dimensionsData = [];
        let questionsData = [];
        
        try {
          // Fetch dimensions
          const dimensionsRes = await fetch("/api/data-accelerator/dimensions/");
          if (dimensionsRes.ok) {
            dimensionsData = await dimensionsRes.json();
          } else {
            throw new Error(`Failed to fetch dimensions: ${dimensionsRes.status}`);
          }
        } catch (dimError) {
          console.error("Error fetching dimensions:", dimError);
          toast({
            title: "Warning",
            description: "Using sample dimension data. Some features may be limited.",
            variant: "default",
          });
          // Use default dimensions if fetch fails
          dimensionsData = [
            {
              id: 1,
              name: "data_trust_engine",
              display_name: "Data Trust Engine",
              slug: "data-trust-engine",
              short_description: "Make your data bulletproof for AI.",
              icon: "🛡️"
            },
            {
              id: 2,
              name: "data_rulebook",
              display_name: "Data Rulebook",
              slug: "data-rulebook",
              short_description: "Keep data safe, compliant, and usable.",
              icon: "📖"
            },
            {
              id: 3,
              name: "ai_power_grid",
              display_name: "AI Power Grid",
              slug: "ai-power-grid",
              short_description: "The tech backbone for AI wins.",
              icon: "⚡"
            }
          ];
        }
        
        try {
          // Fetch questions
          const questionsUrl = assessmentType === "QUICK" 
            ? "/api/data-accelerator/questions/quick_diagnostic/" 
            : "/api/data-accelerator/questions/";
            
          const questionsRes = await fetch(questionsUrl);
          if (questionsRes.ok) {
            questionsData = await questionsRes.json();
          } else {
            throw new Error(`Failed to fetch questions: ${questionsRes.status}`);
          }
        } catch (qError) {
          console.error("Error fetching questions:", qError);
          toast({
            title: "Warning",
            description: "Using sample question data. Some features may be limited.",
            variant: "default",
          });
          // Use default questions if fetch fails
          questionsData = [
            {
              id: 1,
              text: "How would you rate the overall quality and accuracy of your data?",
              help_text: "Consider factors like completeness, consistency, and correctness.",
              dimension: {
                id: 1,
                name: "data_trust_engine",
                display_name: "Data Trust Engine",
                icon: "🛡️"
              }
            },
            {
              id: 2,
              text: "How robust are your data security controls and practices?",
              help_text: "Consider access controls, encryption, and other security measures.",
              dimension: {
                id: 2,
                name: "data_rulebook",
                display_name: "Data Rulebook",
                icon: "📖"
              }
            },
            {
              id: 3,
              text: "How would you rate your technical infrastructure's ability to support AI workloads?",
              help_text: "Consider computing power, storage, and scalability.",
              dimension: {
                id: 3,
                name: "ai_power_grid",
                display_name: "AI Power Grid",
                icon: "⚡"
              }
            }
          ];
        }
        
        setDimensions(dimensionsData);
        setQuestions(questionsData);
        
        // Set initial dimension
        if (dimensionsData.length > 0) {
          setCurrentDimension(dimensionsData[0].id);
        }
      } catch (error) {
        console.error("Error in assessment setup:", error);
        toast({
          title: "Warning",
          description: "Assessment is operating with limited functionality.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [assessmentType, toast]);
  
  // Filter questions by current dimension
  useEffect(() => {
    if (currentDimension) {
      const filtered = questions.filter(q => q.dimension.id === currentDimension);
      setDimensionQuestions(filtered);
    }
  }, [currentDimension, questions]);
  
  // Update progress
  useEffect(() => {
    if (questions.length > 0) {
      const answeredCount = Object.keys(answers).length;
      setProgress((answeredCount / questions.length) * 100);
    }
  }, [answers, questions]);
  
  // Handle step navigation
  const nextStep = () => {
    if (step === 0) {
      // Validate user info
      if (!userInfo.organization_name || !userInfo.email) {
        toast({
          title: "Required Information Missing",
          description: "Please provide your organization name and email address.",
          variant: "destructive",
        });
        return;
      }
      
      // Submit user info and create assessment
      createAssessment();
    } else if (currentDimension !== null) {
      // Check if all questions in current dimension are answered
      const unansweredQuestions = dimensionQuestions.filter(q => !answers[q.id]);
      if (unansweredQuestions.length > 0) {
        toast({
          title: "Incomplete Answers",
          description: "Please answer all questions before continuing.",
          variant: "destructive",
        });
        return;
      }
      
      // Find next dimension
      const currentIndex = dimensions.findIndex(d => d.id === currentDimension);
      if (currentIndex < dimensions.length - 1) {
        setCurrentDimension(dimensions[currentIndex + 1].id);
      } else {
        // All dimensions completed, submit assessment
        submitAssessment();
      }
    }
  };
  
  const prevStep = () => {
    if (step > 0 && currentDimension !== null) {
      const currentIndex = dimensions.findIndex(d => d.id === currentDimension);
      if (currentIndex > 0) {
        setCurrentDimension(dimensions[currentIndex - 1].id);
      } else {
        // Go back to user info
        setStep(0);
      }
    }
  };
  
  // Handle user info changes
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Create assessment with user info
  const createAssessment = async () => {
    try {
      let assessmentData;
      
      try {
        const response = await fetch("/api/data-accelerator/assessments/anonymous_assessment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userInfo,
            assessment_type: assessmentType,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create assessment: ${response.status}`);
        }
        
        assessmentData = await response.json();
      } catch (apiError) {
        console.error("API error creating assessment:", apiError);
        // Generate fake assessment ID if API fails
        assessmentData = {
          id: Math.floor(Math.random() * 1000) + 1
        };
        toast({
          title: "Warning",
          description: "Using simulation mode for assessment. Some features may be limited.",
          variant: "default",
        });
      }
      
      setAssessmentId(assessmentData.id);
      setStep(1);
    } catch (error) {
      console.error("Error in assessment creation:", error);
      toast({
        title: "Warning",
        description: "Continuing in limited functionality mode.",
        variant: "default",
      });
      // Still allow the user to proceed, but with a randomly generated ID
      const fakeId = Math.floor(Math.random() * 1000) + 1;
      setAssessmentId(fakeId);
      setStep(1);
    }
  };
  
  // Handle answer selection
  const handleAnswerChange = (questionId: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };
  
  // Submit all answers
  const submitAssessment = async () => {
    if (!assessmentId) {
      toast({
        title: "Error",
        description: "Assessment not created. Please start over.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
        question: parseInt(questionId),
        score
      }));
      
      try {
        const response = await fetch(`/api/data-accelerator/assessments/${assessmentId}/submit_answers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: formattedAnswers
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to submit answers: ${response.status}`);
        }
        
        await response.json();
      } catch (apiError) {
        console.error("API error submitting answers:", apiError);
        toast({
          title: "Warning",
          description: "Your results will be simulated due to a connection issue.",
          variant: "default",
        });
      }
      
      // Redirect to results page regardless of API success
      router.push(`/assessment/results/${assessmentId}`);
    } catch (error) {
      console.error("Error in assessment submission:", error);
      toast({
        title: "Warning",
        description: "Continuing to results in simulation mode.",
        variant: "default",
      });
      // Still redirect to results page
      router.push(`/assessment/results/${assessmentId}`);
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          {assessmentType === "QUICK" ? "AI Data Accelerator Quick Diagnostic" : "Comprehensive Assessment"}
        </h1>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="text-sm text-gray-500">{Math.round(progress)}% complete</div>
      </div>
      
      {step === 0 ? (
        // User information form
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Organization Information</h2>
                <p className="text-gray-600 mb-6">Please provide your details to start the assessment.</p>
              </div>
              
              <div>
                <Label htmlFor="organization_name">Organization Name*</Label>
                <Input 
                  id="organization_name"
                  name="organization_name"
                  value={userInfo.organization_name}
                  onChange={handleUserInfoChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry"
                  name="industry"
                  value={userInfo.industry}
                  onChange={handleUserInfoChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="company_size">Company Size</Label>
                <Input 
                  id="company_size"
                  name="company_size"
                  value={userInfo.company_size}
                  onChange={handleUserInfoChange}
                  className="mt-1"
                />
              </div>
              
              <Button type="button" onClick={nextStep} className="w-full">
                Start Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Questions for current dimension
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{dimensions.find(d => d.id === currentDimension)?.icon}</span>
              <h2 className="text-2xl font-semibold">
                {dimensions.find(d => d.id === currentDimension)?.display_name}
              </h2>
            </div>
            <p className="text-gray-600">
              {dimensions.find(d => d.id === currentDimension)?.short_description}
            </p>
          </div>
          
          {dimensionQuestions.map(question => (
            <Card key={question.id} className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">{question.text}</h3>
                {question.help_text && (
                  <p className="text-sm text-gray-500 mb-4">{question.help_text}</p>
                )}
                
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  className="space-y-3"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Not implemented</span>
                    <span className="text-sm">Fully optimized</span>
                  </div>
                  
                  <div className="flex justify-between space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center gap-2">
                        <RadioGroupItem 
                          value={value.toString()} 
                          id={`q${question.id}-${value}`} 
                          className="sr-only" 
                        />
                        <label
                          htmlFor={`q${question.id}-${value}`}
                          className={`
                            w-12 h-12 rounded-full flex items-center justify-center border 
                            ${answers[question.id] === value 
                                ? 'bg-primary text-white border-primary' 
                                : 'border-gray-200 hover:bg-gray-50'}
                            cursor-pointer
                          `}
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
            
            <Button onClick={nextStep}>
              {currentDimension === dimensions[dimensions.length - 1]?.id
                ? "Submit Assessment"
                : "Next"
              }
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}