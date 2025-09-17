import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "../Spinner";
import { Plus } from "lucide-react";
import { ClientStatus } from "@/store/useClientStore";
import { DatePicker } from "../ui/date-picker";

const CreateGoal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form
        // onSubmit={handleOnSubmit}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="clientName">Goal Title</Label>
              <Input
                id="clientName"
                name="clientName"
                placeholder="John Doe"
                className="col-span-3"
                // onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="clientEmail">Goal Owner</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                placeholder="johndoe@example.com"
                className="col-span-3"
                // onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Proejct</Label>
              <div className="relative col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Goal Due Date</Label>
              <div className="relative col-span-3">
                <DatePicker />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {/* {loading ? (
                <>
                  <Spinner />
                  Add Goal
                </>
              ) : (
                "Add Goal"
              )} */}
              Add Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoal;
