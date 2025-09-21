import React, { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client"; 

interface JournalPageProps {
  user: any;
  isShieldMode: boolean;
}

export const JournalPage: React.FC<JournalPageProps> = ({ user, isShieldMode }) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setEntries(data || []);
    };

    fetchEntries();
  }, []);

  const addEntry = async () => {
    if (!input.trim()) return;

    const { data, error } = await supabase
      .from("journals")
      .insert([{ content: input, user_id: user?.id }]) 
      .select();

    if (error) console.error(error);
    else setEntries([...(data || []), ...entries]);

    setInput("");
  };

  return (
    <div className={`p-8 max-w-3xl mx-auto ${isShieldMode ? "opacity-75" : ""}`}>
      <h1 className="text-2xl font-bold mb-4">My Journal</h1>
      <div className="flex space-x-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your thoughts..."
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={addEntry}
          className="px-4 py-2 primary-gradient text-white rounded-md"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 border rounded-lg bg-card/50 backdrop-blur-sm"
          >
            {entry.content}
          </div>
        ))}
      </div>
    </div>
  );
};
