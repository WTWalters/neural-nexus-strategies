
// Path: neural_nexus_frontend/src/app/services/accelerator/assessment/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Define the dimensions and their questions
const dimensions = [
  {
    id: "data_quality",
    name: "Data Quality & Integrity",
    description: "Evaluates the accuracy, consistency, and reliability of your data",
    questions: [
      {
        id: "data_quality_1",
        text: "How would you rate the overall quality of your organization's data?",
        options: [
          { value: "1", label: "Poor - Many quality issues and inconsistencies" },
          { value: "2", label: "Fair - Significant quality issues in important areas" },
          { value: "3", label: "Average - Moderate quality issues that require attention" },
          { value: "4", label: "Good - Minor quality issues that are being addressed" },
          { value: "5", label: "Excellent - Consistently high quality with minimal issues" }
        ]
      },
      {
        id: "data_quality_2",
        text: "Do you have formal processes for monitoring and maintaining data quality?",
        options: [
          { value: "1", label: "No formal processes in place" },
          { value: "2", label: "Basic ad-hoc monitoring with manual interventions" },
          { value: "3", label: "Some standardized processes for critical data" },
          { value: "4", label: "Well-defined processes with regular monitoring" },
          { value: "5", label: "Comprehensive automated monitoring with proactive management" }
        ]
      }
    ]
  },
  {
    id: "data_governance",
    name: "Data Governance & Security",
    description: "Assesses how well you manage, secure, and govern your data assets",
    questions: [
      {
        id: "data_governance_1",
        text: "How mature is your organization's data governance framework?",
        options: [
          { value: "1", label: "No formal governance in place" },
          { value: "2", label: "Basic policies exist but limited enforcement" },
          { value: "3", label: "Established governance for some key data domains" },
          { value: "4", label: "Comprehensive governance with good adoption" },
          { value: "5", label: "Advanced governance integrated into all processes" }
        ]
      },
      {
        id: "data_governance_2",
        text: "How well-defined are data ownership and stewardship roles in your organization?",
        options: [
          { value: "1", label: "Roles and responsibilities are unclear" },
          { value: "2", label: "Some informal ownership exists but isn't documented" },
          { value: "3", label: "Formal roles exist for critical data assets" },
          { value: "4", label: "Well-defined roles with clear accountability" },
          { value: "5", label: "Comprehensive data stewardship program across all domains" }
        ]
      }
    ]
  },
  {
    id: "technical_infrastructure",
    name: "Technical Infrastructure",
    description: "Evaluates your computing, storage, and architecture capabilities for AI",
    questions: [
      {
        id: "tech_infra_1",
        text: "How would you rate your organization's data infrastructure scalability?",
        options: [
          { value: "1", label: "Significant constraints with frequent capacity issues" },
          { value: "2", label: "Limited scalability requiring frequent upgrades" },
          { value: "3", label: "Moderate scalability with occasional constraints" },
          { value: "4", label: "Good scalability meeting most current needs" },
          { value: "5", label: "Highly scalable infrastructure with headroom for growth" }
        ]
      },
      {
        id: "tech_infra_2",
        text: "To what extent have you adopted cloud infrastructure for data and analytics?",
        options: [
          { value: "1", label: "No cloud adoption for data workloads" },
          { value: "2", label: "Limited cloud experimentation or pilot projects" },
          { value: "3", label: "Partial cloud adoption for specific use cases" },
          { value: "4", label: "Significant cloud adoption with hybrid approach" },
          { value: "5", label: "Cloud-first strategy with comprehensive implementation" }
        ]
      }
    ]
  },
  {
    id: "organizational_readiness",
    name: "Organizational Readiness",
    description: "Evaluates the people, skills, and culture needed for AI success",
    questions: [
      {
        id: "org_readiness_1",
        text: "How would you assess your organization's data literacy levels?",
        options: [
          { value: "1", label: "Very limited understanding of data concepts" },
          { value: "2", label: "Basic literacy limited to specific teams" },
          { value: "3", label: "Moderate literacy with varying levels across teams" },
          { value: "4", label: "Good literacy with established training programs" },
          { value: "5", label: "High data literacy across the organization" }
        ]
      },
      {
        id: "org_readiness_2",
        text: "How strong is executive sponsorship for data and AI initiatives?",
        options: [
          { value: "1", label: "Limited or no executive support" },
          { value: "2", label: "Passive support but limited engagement" },
          { value: "3", label: "Moderate support with some investment" },
          { value: "4", label: "Strong support from key executives" },
          { value: "5", label: "Full C-suite alignment with strategic prioritization" }
        ]
      }
    ]
  }
];

export default function AIReadinessAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const totalSteps = dimensions.length + 1; // +1 for contact info
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleNext = () => {
    // If we're on a question step, check if all questions are answered
    if (step < dimensions.length) {
      const currentDimension = dimensions[step];
      const allAnswered = currentDimension.questions.every(
        question => answers[question.id]
      );
      
      if (!allAnswered) {
        // Show an error or warning
        alert("Please answer all questions before proceeding");
        return;
      }
    }
    
    // Move to next step
    setStep(prev => prev + 1);
  };
  
  const handlePrevious = () => {
    setStep(prev => Math.max(0, prev - 1));
  };
  
  const calculateScore = () => {
    let totalScore = 0;
    let totalQuestions = 0;
    
    dimensions.forEach(dimension => {
      dimension.questions.forEach(question => {
        if (answers[question.id]) {
          totalScore += parseInt(answers[question.id]);
          totalQuestions++;
        }
      });
    });
    
    return totalQuestions > 0 ? Math.round((totalScore / (totalQuestions * 5)) * 100) : 0;
  };
  
  const handleSubmit = async () => {
    // Validate contact info
    if (!email || !company) {
      alert("Please provide your email and company name");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // In a real implementation, you would send the data to the server
      // await fetch('/api/submit-assessment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, company, role, answers }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error submitting your assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Calculate dimension scores
  const getDimensionScore = (dimensionId: string) => {
    const dimension = dimensions.find(d => d.id === dimensionId);
    if (!dimension) return 0;
    
    let totalScore = 0;
    let answeredQuestions = 0;
    
    dimension.questions.forEach(question => {
      if (answers[question.id]) {
        totalScore += parseInt(answers[question.id]);
        answeredQuestions++;
      }
    });
    
    return answeredQuestions > 0 ? (totalScore / (answeredQuestions * 5)) * 100 : 0;
  };
  
  // Show results screen
  if (submitted) {
    const overallScore = calculateScore();
    
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="mb-8">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl md:text-3xl text-gray-900">
              Your AI Readiness Score: {overallScore}%
            </CardTitle>
            <CardDescription>
              Based on your responses, here's how ready your organization is for AI implementation
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Beginning</span>
                <span>Developing</span>
                <span>Established</span>
                <span>Advanced</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full mb-4">
                <div 
                  className="h-3 bg-blue-600 rounded-full" 
                  style={{ width: `${overallScore}%` }}
                />
              </div>
              <p className="mt-4 text-gray-600">
                {overallScore < 40 ? (
                  "Your organization is in the early stages of AI readiness. Focus on building a solid data foundation before advancing further."
                ) : overallScore < 60 ? (
                  "Your organization has made progress in several key areas, but there are still important gaps to address."
                ) : overallScore < 80 ? (
                  "Your organization has a strong foundation for AI implementation, with a few areas that need improvement."
                ) : (
                  "Your organization is well-positioned for AI success with mature data practices across most dimensions."
                )}
              </p>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Dimension Breakdown</h3>
            <div className="space-y-6">
              {dimensions.map(dimension => {
                const score = getDimensionScore(dimension.id);
                return (
                  <div key={dimension.id}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{dimension.name}</h4>
                      <span className="text-sm font-semibold">{Math.round(score)}%</span>
                    </div>
                    <Progress value={score} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">{dimension.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 justify-center border-t pt-6">
            <Button size="lg" asChild>
              <Link href="/services/accelerator">
                Explore the AI Velocity Framework
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-bold text-blue-800 mb-4">What's Next?</h3>
          <p className="text-blue-700 mb-4">
            Your AI Readiness Assessment results provide a starting point for your AI journey. To truly accelerate your AI success, consider these next steps:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blue-500 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span><strong>Comprehensive Assessment:</strong> Dive deeper with our 2-day assessment to identify specific AI opportunities and challenges.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blue-500 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span><strong>Strategic Roadmap:</strong> Develop a clear 90-day action plan to accelerate your AI journey and address key gaps.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blue-500 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span><strong>Expert Consultation:</strong> Schedule a call with our team to discuss your unique challenges and opportunities.</span>
            </li>
          </ul>
          <p className="text-blue-700 mb-4">
            We've emailed your full assessment results to {email}. If you have any questions, please contact us.
          </p>
        </div>
      </div>
    );
  }
  
  // Show form
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl md:text-3xl text-gray-900">
            AI Readiness Assessment
          </CardTitle>
          <CardDescription>
            Discover your organization's AI potential in just 5 minutes
          </CardDescription>
          <div className="mt-4">
            <Progress 
              value={(step / totalSteps) * 100} 
              className="h-2" 
            />
            <div className="mt-2 text-sm text-gray-500">
              Step {step + 1} of {totalSteps}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="py-6">
          {step < dimensions.length ? (
            // Question step
            <div>
              <h3 className="text-xl font-bold mb-1">{dimensions[step].name}</h3>
              <p className="text-gray-600 mb-6">{dimensions[step].description}</p>
              
              <div className="space-y-8">
                {dimensions[step].questions.map(question => (
                  <div key={question.id} className="space-y-4">
                    <h4 className="font-medium">{question.text}</h4>
                    <RadioGroup 
                      value={answers[question.id] || ""}
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                      className="space-y-3"
                    >
                      {question.options.map(option => (
                        <div key={option.value} className="flex items-start space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label 
                            htmlFor={`${question.id}-${option.value}`}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Contact info step
            <div>
              <h3 className="text-xl font-bold mb-6">Your Information</h3>
              <p className="text-gray-600 mb-6">
                Please provide your details to receive your personalized AI readiness assessment report.
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="block mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="role" className="block mb-2">
                    Your Role
                  </Label>
                  <Input
                    id="role"
                    placeholder="e.g., CIO, Data Analyst, VP of Technology"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="comments" className="block mb-2">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share any specific AI challenges or goals your organization has"
                    rows={4}
                  />
                </div>
                
                <div className="text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to receive your assessment results and related information from Neural Nexus Strategies. We respect your privacy and will not share your information with third parties.
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          {step > 0 ? (
            <Button variant="outline" onClick={handlePrevious} disabled={submitting}>
              Previous
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}
          
          {step < totalSteps - 1 ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="min-w-[120px]"
            >
              {submitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
