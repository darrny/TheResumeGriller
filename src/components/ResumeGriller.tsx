import React, { useState } from 'react';
import { Upload, AlertTriangle, Flame, Loader2, GraduationCap, Briefcase, Code, FolderGit2 } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfProcessing';
import { analyzeResumeContent } from '../utils/analysisEngine';

interface AnalysisResult {
    skillsGap: string[];
    improvements: string[];
    score: number;
    experienceLevel: {
        level: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
        yearsOfExperience: number;
    };
    sectionAnalysis: {
        education: SectionAnalysis;
        experience: SectionAnalysis;
        skills: SectionAnalysis;
        projects: SectionAnalysis;
        contact: SectionAnalysis;
    };
    fieldSpecificFeedback: string[];
}

interface SectionAnalysis {
    present: boolean;
    score: number;
    issues: string[];
}

const ResumeGriller = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [selectedField, setSelectedField] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fields = [
        "Artificial Intelligence (AI)", "Machine Learning (ML)", "Data Science",
        "Cloud Computing", "Cybersecurity", "Blockchain Development",
        "Software Development", "Web Development", "Mobile App Development",
        "DevOps", "Big Data", "Natural Language Processing (NLP)",
        "Computer Vision", "Robotics", "Internet of Things (IoT)",
        "Database Administration", "Game Development", "UI/UX Design",
        "Bioinformatics", "AR and VR", "Data Engineering",
        "Distributed Systems", "Digital Marketing and Analytics",
        "Ethical Hacking", "Product Management"
    ];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
                setError('WHAT IS THIS GARBAGE?! I ONLY ACCEPT PDFs!!!');
                return;
            }
            setFile(selectedFile);
        }
    };

    const processResume = async () => {
        if (!file || !selectedField) {
            setError('SELECT A FIELD AND UPLOAD A RESUME, YOU DONKEY!!!');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            console.log('Starting PDF extraction...');
            const text = await extractTextFromPDF(file);
            console.log('Extracted text:', text);

            console.log('Starting resume analysis...');
            const result = await analyzeResumeContent(text, selectedField);
            console.log('Analysis result:', result);

            setAnalysis(result);
        } catch (err) {
            console.error('Error in processResume:', err);
            setError(err instanceof Error ? err.message : 'FAILED TO PROCESS YOUR RESUME!!!');
        } finally {
            setIsProcessing(false);
        }
    };

    const renderSectionAnalysis = (section: SectionAnalysis, title: string, icon: React.ReactNode) => (
        <div className="mb-6 bg-red-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
                {icon}
                <h3 className="text-xl font-bold text-red-600 ml-2">{title}</h3>
                <span className="ml-auto text-red-600 font-bold">
                    {section.score}/100
                </span>
            </div>
            {section.issues.map((issue, index) => (
                <div key={index} className="flex items-center text-red-600 mt-2">
                    <span className="mr-2">🔥</span>
                    <span className="font-bold">{issue}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-red-500">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-8 relative top-5">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        THE RESUME GRILLER! 🔥
                    </h1>
                    <p className="text-red-500 font-bold text-lg">
                        PREPARE TO GET YOUR RESUME ROASTED TO PERFECTION!!!
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="mb-6">
                        <label className="block text-red-600 font-bold mb-2">
                            WHAT'S YOUR SPECIALTY, YOU DONKEY?!!!
                        </label>
                        <select
                            className="w-full p-2 border-2 border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={selectedField}
                            onChange={(e) => setSelectedField(e.target.value)}
                        >
                            <option value="">PICK A FIELD NOW!!!</option>
                            {fields.map((field) => (
                                <option key={field} value={field}>{field}</option>
                            ))}
                        </select>
                    </div>

                    <div className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center mb-6 hover:border-red-500 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-red-500 mb-4" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors font-bold inline-block"
                        >
                            THROW YOUR RESUME ON THE GRILL!!!
                        </label>
                        {file && (
                            <p className="mt-2 text-red-500">
                                Selected: {file.name}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-4">
                            <p className="text-red-600 font-bold">{error}</p>
                        </div>
                    )}

                    {file && (
                        <button
                            onClick={processResume}
                            disabled={isProcessing}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:bg-red-400"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    GRILLING YOUR RESUME...
                                </>
                            ) : (
                                <>
                                    <Flame className="w-6 h-6" />
                                    ROAST THIS RESUME!!!
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Analysis Results */}
                {analysis && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* Overall Score */}
                        <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-6">
                            <div className="flex items-center">
                                <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                                <span className="text-red-600 font-bold text-lg">
                                    {analysis.experienceLevel.level.toUpperCase()} LEVEL? HA! A MEASLY {analysis.score}/100!! {analysis.experienceLevel.yearsOfExperience} YEARS OF EXPERIENCE AND THIS IS WHAT YOU SHOW?!!!
                                </span>
                            </div>
                        </div>

                        {/* Field-Specific Feedback */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-red-600 mb-4 uppercase">
                                FIELD-SPECIFIC ISSUES:
                            </h3>
                            <div className="bg-red-50 p-4 rounded-lg">
                                {analysis.fieldSpecificFeedback.map((feedback, index) => (
                                    <div key={index} className="flex items-center text-red-600 mb-2">
                                        <span className="mr-2">😡</span>
                                        <span className="font-bold">{feedback}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section Analysis */}
                        {renderSectionAnalysis(analysis.sectionAnalysis.education, 'EDUCATION SECTION', <GraduationCap className="w-6 h-6 text-red-600" />)}
                        {renderSectionAnalysis(analysis.sectionAnalysis.experience, 'EXPERIENCE SECTION', <Briefcase className="w-6 h-6 text-red-600" />)}
                        {renderSectionAnalysis(analysis.sectionAnalysis.skills, 'SKILLS SECTION', <Code className="w-6 h-6 text-red-600" />)}
                        {renderSectionAnalysis(analysis.sectionAnalysis.projects, 'PROJECTS SECTION', <FolderGit2 className="w-6 h-6 text-red-600" />)}

                        {/* Missing Skills */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-red-600 mb-4 uppercase">
                                MISSING CRITICAL SKILLS:
                            </h3>
                            <div className="bg-red-50 p-4 rounded-lg">
                                {analysis.skillsGap.map((skill) => (
                                    <div key={skill} className="flex items-center text-red-600 mb-2">
                                        <span className="mr-2">🔥</span>
                                        <span className="font-bold">NO {skill.toUpperCase()}?! ARE YOU KIDDING ME?!!!</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* General Improvements */}
                        <div>
                            <h3 className="text-xl font-bold text-red-600 mb-4 uppercase">
                                FIX THESE ISSUES BEFORE I LOSE MY MIND!!!
                            </h3>
                            <div className="bg-red-50 p-4 rounded-lg">
                                {analysis.improvements.map((improvement, index) => (
                                    <div key={index} className="flex items-center text-red-600 mb-2">
                                        <span className="mr-2">😡</span>
                                        <span className="font-bold">{improvement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeGriller;