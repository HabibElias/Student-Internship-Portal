import CompanyForm from "@/components/Forms/CompanyForm";
import StudentForm from "@/components/Forms/StudentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterPage = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mx-auto flex w-[80%] sm:w-[49%] items-center justify-center gap-2">
        <TabsTrigger
          value="student"
          className="cursor-pointer transition-colors duration-100 hover:bg-[#5c5bb9] hover:text-white/70 data-[state=active]:bg-[#7D7ADA] data-[state=active]:text-white data-[state=active]:hover:bg-[#5c5bb9]"
        >
          Student
        </TabsTrigger>
        <TabsTrigger
          value="company"
          className="cursor-pointer transition-colors duration-100 hover:bg-[#5c5bb9] hover:text-white/70 data-[state=active]:bg-[#7D7ADA] data-[state=active]:text-white data-[state=active]:hover:bg-[#5c5bb9]"
        >
          Company
        </TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <StudentForm />
      </TabsContent>
      <TabsContent value="company">
        <CompanyForm />
      </TabsContent>
    </Tabs>
  );
};

export default RegisterPage;
