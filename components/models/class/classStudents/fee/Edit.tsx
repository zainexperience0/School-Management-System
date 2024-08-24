"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FeeEdit = ({ model, id, callbackFn }: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id, model]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`/api/v1/dynamic/${model.model}/${id}`);
      setData(resp.data);
    } catch (error) {
      setFailed(true);
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const requiredFields = model.fields?.filter(
      (field: any) => field.required && field.dataType !== "relation"
    );

    if (requiredFields?.length > 0) {
      const isEmptyRecord = requiredFields.find(
        (field: any) =>
          data[field.slug] === undefined || data[field.slug] === ""
      );
      if (isEmptyRecord) {
        alert(`Please fill all required fields: 
            ${requiredFields.map((field: any) => field.name).join(", ")}`);
        return;
      }
    }

    setEditing(true);
    try {
      await axios.put(`/api/v1/dynamic/${model.model}/${id}`, data);
      setEditSuccess(true);
      setTimeout(() => {
        resetFields();
        if (!callbackFn) {
          window.location.reload();
        } else {
          callbackFn();
        }
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
      setEditFail(true);
    } finally {
      setEditing(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setData((prevData: any) => ({ ...prevData, status: value }));
    handleUpdate();
  };

  const resetFields = () => {
    setEditing(false);
    setEditSuccess(false);
    setEditFail(false);
  };

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">Page not found!</p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">Failed to get data!</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl  my-10 px-2">
      <Select
        value={data?.status || ""}
        onValueChange={handleStatusChange}
        disabled={editing} // Disable Select during editing
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Select Status"} />
        </SelectTrigger>
        <SelectContent className="w-full">
          {!editing && (
            <>
              <SelectItem value="SUBMITTED">Submitted</SelectItem>
              <SelectItem value="NOT_SUBMITTED">Not Submitted</SelectItem>
              <SelectItem value="LATE_SUBMITTED">Late Submitted</SelectItem>
            </>
          )}
          {editing && <Loader className="h-4 w-4 mr-2 animate-spin" />}
          {editing && "Saving..."}
          {editSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
          {editSuccess && `${model.name} saved!`}
          {editFail && "Failed to update!"}
        </SelectContent>
      </Select>
    </div>
  );
};
