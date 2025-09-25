import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export default function App() {
  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button
          onClick={async () => {
            const res = await api.files.pickFolder();
            console.log(res);
          }}
        >
          <span>Add</span> <Plus />
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 9 }).map((_, i) => {
          return (
            <Card key={i} className="col-span-4">
              <CardHeader>
                <CardTitle>Project {i}</CardTitle>
                <CardDescription>com.github.project</CardDescription>
                <CardAction>
                  <Button variant="outline">Open</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
