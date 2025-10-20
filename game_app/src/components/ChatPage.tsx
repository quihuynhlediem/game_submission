import { Card } from '../types/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { estimateTokens } from '../utils/tokenUtils';

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prompt, evaluation } = location.state as { prompt: string; evaluation: Card['quality'] };

  const totalTokens = estimateTokens(prompt);

  // Simulated AI responses based on card quality
  const getAIResponse = () => {
    switch (evaluation) {
      case 'optimized':
        return {
          response: "Here's a clear and well-structured response based on your optimized prompt. The specific requirements have been met efficiently, demonstrating effective prompt engineering.",
          className: "border-green-400",
          status: "✨ Optimized Response",
          tokenNote: "Excellent token usage! Your prompt was clear and efficient."
        };
      case 'non-optimized':
        return {
          response: "While I understand your request, the prompt could be more efficient. Consider being more specific about requirements and structuring key information more clearly.",
          className: "border-yellow-400",
          status: "⚠️ Could Be Improved",
          tokenNote: "Token usage could be optimized. Try reducing repetitive elements."
        };
      case 'wrong':
        return {
          response: "I'm unable to provide an appropriate response based on this prompt. The requirements or context might be unclear or missing essential elements.",
          className: "border-red-400",
          status: "❌ Needs Revision",
          tokenNote: "High token usage without clear direction. Consider restructuring the prompt."
        };
      default:
        return {
          response: "Something went wrong. Please try again.",
          className: "border-gray-400",
          status: "Error",
          tokenNote: "Unable to analyze tokens"
        };
    }
  };

  const aiResponse = getAIResponse();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Prompt Evaluation</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
          >
            Back to Craft
          </button>
        </div>

        {/* Status Banner */}
        <div className={`mb-6 p-4 rounded-lg border-2 ${aiResponse.className} bg-gray-800`}>
          <div className="text-lg font-semibold mb-2">{aiResponse.status}</div>
          <div className="text-sm text-gray-300">{aiResponse.tokenNote}</div>
          <div className="mt-2 text-sm text-gray-400">Total tokens: {totalTokens}</div>
        </div>

        {/* Chat Container */}
        <div className="space-y-6">
          {/* User Prompt */}
          <div className="flex flex-col items-end space-y-2">
            <div className="p-4 rounded-lg bg-blue-600 text-white max-w-3xl ml-12">
              {prompt}
            </div>
            <div className="text-sm text-gray-400">Your prompt</div>
          </div>

          {/* AI Response */}
          <div className="flex flex-col items-start space-y-2">
            <div className={`p-4 rounded-lg bg-gray-800 max-w-3xl mr-12 border ${aiResponse.className}`}>
              {aiResponse.response}
            </div>
            <div className="text-sm text-gray-400">AI response</div>
          </div>
        </div>

        {/* Improvement Tips for non-optimized and wrong cases */}
        {(evaluation === 'non-optimized' || evaluation === 'wrong') && (
          <div className="mt-8 p-4 rounded-lg bg-gray-800 border border-blue-400">
            <h2 className="text-lg font-semibold mb-3">💡 Improvement Tips</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {evaluation === 'non-optimized' && (
                <>
                  <li>Make your requirements more specific and direct</li>
                  <li>Structure your prompt with clear sections</li>
                  <li>Remove any redundant information</li>
                  <li>Consider using bullet points for multiple requirements</li>
                </>
              )}
              {evaluation === 'wrong' && (
                <>
                  <li>Include all essential context and requirements</li>
                  <li>Break down complex requests into clear steps</li>
                  <li>Specify the expected format of the response</li>
                  <li>Review and remove any conflicting instructions</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}