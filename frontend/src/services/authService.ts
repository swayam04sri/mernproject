export async function login(credentials: { uid: string; password: string }) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      return response.json();
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
    }
  }
  