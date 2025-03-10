from django.core.management.base import BaseCommand
from data_accelerator.models import (
    AcceleratorDimension, 
    AcceleratorMaturityLevel,
    AssessmentQuestion,
    Recommendation
)


class Command(BaseCommand):
    help = 'Set up initial data for the AI Data Accelerator framework'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Setting up AI Data Accelerator framework...'))
        
        # Create default dimensions
        self.stdout.write('Creating dimensions...')
        AcceleratorDimension.create_default_dimensions()
        
        # Create maturity levels
        self.stdout.write('Creating maturity levels...')
        AcceleratorMaturityLevel.create_default_levels()
        
        # Create questions
        self.stdout.write('Creating assessment questions...')
        self._create_assessment_questions()
        
        # Create recommendations
        self.stdout.write('Creating default recommendations...')
        self._create_default_recommendations()
        
        self.stdout.write(self.style.SUCCESS('AI Data Accelerator framework setup complete!'))
    
    def _create_assessment_questions(self):
        """Create sample assessment questions for each dimension."""
        # Get all dimensions
        dimensions = AcceleratorDimension.objects.all()
        
        # Question data - 3 per dimension for quick diagnostic
        questions_data = {
            "data_trust_engine": [
                {
                    "text": "How would you rate the overall quality and accuracy of your data?",
                    "help_text": "Consider factors like completeness, consistency, and correctness.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have processes in place to detect and correct data errors?",
                    "help_text": "This includes automated validation, cleansing, and error handling.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How would you rate your organization's data documentation and definitions?",
                    "help_text": "Consider data dictionaries, metadata, and shared understanding of data elements.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent do you maintain data lineage for critical data assets?",
                    "help_text": "Data lineage tracks the origin and transformations of data throughout its lifecycle.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How effectively do you measure and monitor data quality over time?",
                    "help_text": "Consider metrics, dashboards, and regular reporting on data quality.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "data_rulebook": [
                {
                    "text": "How robust are your data security controls and practices?",
                    "help_text": "Consider access controls, encryption, and other security measures.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent have you implemented formal data governance policies?",
                    "help_text": "This includes roles, responsibilities, and processes for managing data.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How well does your organization comply with relevant data regulations?",
                    "help_text": "Consider regulations like GDPR, CCPA, HIPAA, etc. that apply to your industry.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have a data governance committee or dedicated data stewards?",
                    "help_text": "These roles oversee data quality, usage, and compliance.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How mature is your approach to data privacy and ethical use of data?",
                    "help_text": "Consider privacy by design principles and ethical frameworks for AI.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "ai_power_grid": [
                {
                    "text": "How would you rate your technical infrastructure's ability to support AI workloads?",
                    "help_text": "Consider computing power, storage, and scalability.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent do you leverage cloud services for data and AI operations?",
                    "help_text": "Cloud services can provide scalability and specialized AI capabilities.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How automated are your infrastructure provisioning and scaling processes?",
                    "help_text": "Automation enables faster deployment and more efficient resource utilization.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have dedicated environments for AI development, testing, and production?",
                    "help_text": "Separate environments support the full lifecycle of AI solutions.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How well can your infrastructure handle real-time data processing for AI?",
                    "help_text": "Real-time processing capabilities enable more responsive AI applications.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "data_flow_superhighway": [
                {
                    "text": "How would you rate the integration between your different data systems?",
                    "help_text": "Consider how well data flows between databases, applications, and departments.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent have you implemented APIs for data access?",
                    "help_text": "APIs provide standardized methods for accessing and sharing data.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How easily can users across your organization access the data they need?",
                    "help_text": "Consider self-service capabilities and access request processes.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have a data catalog or inventory of available data assets?",
                    "help_text": "A data catalog helps users discover and understand available data.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How advanced are your ETL (Extract, Transform, Load) or data pipeline capabilities?",
                    "help_text": "These processes move and transform data for analysis and AI use.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "ai_fuel_factory": [
                {
                    "text": "How mature are your organization's capabilities for preparing data specifically for AI?",
                    "help_text": "Consider feature engineering, data labeling, and AI-specific transformations.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent do you have labeled datasets available for training AI models?",
                    "help_text": "Labeled data is essential for supervised learning approaches.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How systematically do you handle biases in your data for AI applications?",
                    "help_text": "Bias detection and mitigation are crucial for responsible AI.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you maintain separate training, validation, and test datasets for AI development?",
                    "help_text": "This separation helps ensure model accuracy and generalizability.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How well do you version and track your AI datasets?",
                    "help_text": "Dataset versioning ensures reproducibility and proper model evolution.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "ai_mindset_shift": [
                {
                    "text": "How would you rate your organization's overall data literacy?",
                    "help_text": "Data literacy is the ability to read, work with, analyze, and communicate with data.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent does your organization's leadership support AI initiatives?",
                    "help_text": "Executive sponsorship is critical for successful AI adoption.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How would you rate your organization's ability to collaborate across departments on data initiatives?",
                    "help_text": "Cross-functional collaboration is essential for comprehensive AI solutions.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have training programs to develop AI and data skills within your organization?",
                    "help_text": "Upskilling helps build internal capabilities for AI adoption.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How well has your organization embraced data-driven decision making?",
                    "help_text": "This cultural shift is foundational for successful AI implementation.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ],
            "ai_deployment_machine": [
                {
                    "text": "How mature are your processes for deploying AI models to production?",
                    "help_text": "Consider standardized deployment workflows and automation.",
                    "order": 1,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "To what extent do you monitor the performance of deployed AI models?",
                    "help_text": "Monitoring helps detect model drift and performance issues.",
                    "order": 2,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "How well defined are your feedback loops for improving AI models over time?",
                    "help_text": "Feedback mechanisms enable continuous improvement of AI solutions.",
                    "order": 3,
                    "is_quick_diagnostic": True
                },
                {
                    "text": "Do you have processes for validating AI model outputs before acting on them?",
                    "help_text": "Validation ensures AI outputs are trustworthy before being used for decisions.",
                    "order": 4,
                    "is_quick_diagnostic": False
                },
                {
                    "text": "How advanced are your MLOps (Machine Learning Operations) practices?",
                    "help_text": "MLOps combines ML systems development and operations to manage production ML lifecycles.",
                    "order": 5,
                    "is_quick_diagnostic": False
                }
            ]
        }
        
        # Create questions for each dimension
        for dimension in dimensions:
            dimension_questions = questions_data.get(dimension.name, [])
            for q_data in dimension_questions:
                AssessmentQuestion.objects.get_or_create(
                    dimension=dimension,
                    text=q_data["text"],
                    defaults={
                        "help_text": q_data["help_text"],
                        "order": q_data["order"],
                        "is_quick_diagnostic": q_data["is_quick_diagnostic"]
                    }
                )
    
    def _create_default_recommendations(self):
        """Create default recommendations for each dimension and maturity level."""
        # Get dimensions and maturity levels
        dimensions = AcceleratorDimension.objects.all()
        maturity_levels = AcceleratorMaturityLevel.objects.all()
        
        baseline = maturity_levels.get(slug="baseline")
        intermediate = maturity_levels.get(slug="intermediate")
        advanced = maturity_levels.get(slug="advanced")
        
        # Recommendations data
        recommendations_data = {
            "data_trust_engine": {
                "baseline": [
                    {
                        "text": "Implement basic data quality checks for critical datasets.",
                        "effort": "1-3 months",
                        "impact": "High"
                    },
                    {
                        "text": "Create a simple data dictionary for your most important data assets.",
                        "effort": "2-4 weeks",
                        "impact": "Medium"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Implement automated data quality monitoring across your organization.",
                        "effort": "3-6 months",
                        "impact": "High"
                    },
                    {
                        "text": "Establish data quality metrics and dashboards.",
                        "effort": "1-2 months",
                        "impact": "Medium"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement AI-powered data quality tools to proactively detect and fix issues.",
                        "effort": "6-12 months",
                        "impact": "High"
                    },
                    {
                        "text": "Establish continuous data quality improvement processes integrated with business workflows.",
                        "effort": "3-6 months",
                        "impact": "Medium"
                    }
                ]
            },
            "data_rulebook": {
                "baseline": [
                    {
                        "text": "Develop basic data governance policies and assign data owners.",
                        "effort": "2-3 months",
                        "impact": "High"
                    },
                    {
                        "text": "Implement basic access controls for sensitive data.",
                        "effort": "1-2 months",
                        "impact": "High"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Establish a data governance committee with clear roles and responsibilities.",
                        "effort": "2-3 months",
                        "impact": "Medium"
                    },
                    {
                        "text": "Implement data classification and handling procedures.",
                        "effort": "3-4 months",
                        "impact": "Medium"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement automated compliance monitoring and reporting.",
                        "effort": "6-12 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop and implement an AI ethics framework.",
                        "effort": "4-6 months",
                        "impact": "Medium"
                    }
                ]
            },
            "ai_power_grid": {
                "baseline": [
                    {
                        "text": "Perform a technical infrastructure assessment for AI readiness.",
                        "effort": "1-2 months",
                        "impact": "High"
                    },
                    {
                        "text": "Migrate key datasets to cloud storage for better accessibility.",
                        "effort": "2-3 months",
                        "impact": "Medium"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Implement scalable compute resources for AI model training and deployment.",
                        "effort": "3-6 months",
                        "impact": "High"
                    },
                    {
                        "text": "Establish infrastructure as code practices for reproducible AI environments.",
                        "effort": "2-4 months",
                        "impact": "Medium"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement a multi-cloud strategy optimized for different AI workloads.",
                        "effort": "6-12 months",
                        "impact": "Medium"
                    },
                    {
                        "text": "Deploy specialized AI hardware (GPUs/TPUs) for performance optimization.",
                        "effort": "3-6 months",
                        "impact": "High"
                    }
                ]
            },
            "data_flow_superhighway": {
                "baseline": [
                    {
                        "text": "Create an inventory of your data sources and systems.",
                        "effort": "1-2 months",
                        "impact": "Medium"
                    },
                    {
                        "text": "Implement basic ETL processes for key datasets.",
                        "effort": "2-3 months",
                        "impact": "High"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Develop an API strategy for consistent data access.",
                        "effort": "3-6 months",
                        "impact": "High"
                    },
                    {
                        "text": "Implement a data lake for consolidated storage of structured and unstructured data.",
                        "effort": "4-8 months",
                        "impact": "High"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement real-time data streaming for immediate insights.",
                        "effort": "6-12 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop a data mesh architecture for decentralized domain-oriented data ownership.",
                        "effort": "8-12 months",
                        "impact": "Medium"
                    }
                ]
            },
            "ai_fuel_factory": {
                "baseline": [
                    {
                        "text": "Establish basic processes for data labeling and annotation.",
                        "effort": "2-3 months",
                        "impact": "High"
                    },
                    {
                        "text": "Implement standard practices for feature selection and engineering.",
                        "effort": "1-3 months",
                        "impact": "Medium"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Implement a feature store for reusable AI features.",
                        "effort": "3-6 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop bias detection and mitigation practices for AI datasets.",
                        "effort": "2-4 months",
                        "impact": "High"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement automated feature engineering and selection tools.",
                        "effort": "6-12 months",
                        "impact": "Medium"
                    },
                    {
                        "text": "Develop synthetic data generation capabilities for scarce data scenarios.",
                        "effort": "4-8 months",
                        "impact": "High"
                    }
                ]
            },
            "ai_mindset_shift": {
                "baseline": [
                    {
                        "text": "Conduct AI awareness training for key stakeholders.",
                        "effort": "1-2 months",
                        "impact": "Medium"
                    },
                    {
                        "text": "Develop and communicate an AI vision and strategy.",
                        "effort": "2-3 months",
                        "impact": "High"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Establish a Center of Excellence for AI and data initiatives.",
                        "effort": "3-6 months",
                        "impact": "High"
                    },
                    {
                        "text": "Implement a data literacy program across the organization.",
                        "effort": "4-8 months",
                        "impact": "Medium"
                    }
                ],
                "advanced": [
                    {
                        "text": "Create an AI innovation program with dedicated resources and incentives.",
                        "effort": "6-12 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop a comprehensive change management strategy for AI transformation.",
                        "effort": "3-6 months",
                        "impact": "High"
                    }
                ]
            },
            "ai_deployment_machine": {
                "baseline": [
                    {
                        "text": "Establish basic model deployment and monitoring processes.",
                        "effort": "2-3 months",
                        "impact": "High"
                    },
                    {
                        "text": "Implement regular model performance reviews.",
                        "effort": "1-2 months",
                        "impact": "Medium"
                    }
                ],
                "intermediate": [
                    {
                        "text": "Implement a standardized MLOps platform for model lifecycle management.",
                        "effort": "4-8 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop automated testing frameworks for AI models.",
                        "effort": "3-5 months",
                        "impact": "Medium"
                    }
                ],
                "advanced": [
                    {
                        "text": "Implement continuous delivery and integration for AI models.",
                        "effort": "6-12 months",
                        "impact": "High"
                    },
                    {
                        "text": "Develop self-optimizing systems with automated retraining based on performance.",
                        "effort": "8-12 months",
                        "impact": "High"
                    }
                ]
            }
        }
        
        # Create recommendations
        for dimension in dimensions:
            dim_recommendations = recommendations_data.get(dimension.name, {})
            
            # Baseline recommendations
            for rec_data in dim_recommendations.get("baseline", []):
                Recommendation.objects.get_or_create(
                    dimension=dimension,
                    maturity_level=baseline,
                    text=rec_data["text"],
                    defaults={
                        "estimated_effort": rec_data["effort"],
                        "estimated_impact": rec_data["impact"]
                    }
                )
            
            # Intermediate recommendations
            for rec_data in dim_recommendations.get("intermediate", []):
                Recommendation.objects.get_or_create(
                    dimension=dimension,
                    maturity_level=intermediate,
                    text=rec_data["text"],
                    defaults={
                        "estimated_effort": rec_data["effort"],
                        "estimated_impact": rec_data["impact"]
                    }
                )
            
            # Advanced recommendations
            for rec_data in dim_recommendations.get("advanced", []):
                Recommendation.objects.get_or_create(
                    dimension=dimension,
                    maturity_level=advanced,
                    text=rec_data["text"],
                    defaults={
                        "estimated_effort": rec_data["effort"],
                        "estimated_impact": rec_data["impact"]
                    }
                )
