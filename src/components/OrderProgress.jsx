export default function OrderProgress({ status }) {
  const steps = ["pending", "paid", "printing", "shipped", "delivered"];

  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 text-center relative">
            {/* Circle */}
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-semibold
                ${
                  index <= currentStepIndex
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <p className="mt-2 text-xs capitalize">{step}</p>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-1 -z-10
                  ${
                    index < currentStepIndex
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
