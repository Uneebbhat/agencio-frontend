import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck, CheckCircle2 } from "lucide-react";

const EmailSentSuccess = () => {
  return (
    <>
      <Card className="text-center max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 p-3 rounded-full">
            <MailCheck size={48} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Check Your Inbox! ✉️
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base leading-relaxed">
            We've sent a confirmation email to your account. Here's what to do
            next:
          </CardDescription>
          <div className="flex flex-col items-start space-y-3 text-left">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Open your email inbox</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Click the verification link in the email</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Complete the verification process</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Can't find the email? Check your spam folder or contact support if
            you need help.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default EmailSentSuccess;
