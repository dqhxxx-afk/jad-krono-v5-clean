"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

const emptyWatch = {
  id: "",
  brand: "",
  model: "",
  reference: "",
  year: "",
  condition: "Excellent",
  set: "Full Set",
  status: "Available",
  price: "Price on request",
  category: "rolex",
  featured: true,
  image: "",
  gallery: [],
  specs: {
    case: "",
    movement: "",
    material: "",
    bracelet: ""
  },
  description: ""
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [watches, setWatches] = useState([]);
  const [form, setForm] = useState(emptyWatch);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const canUseAdmin = isSupabaseConfigured;

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function login() {
    if (!email) return setMessage("Enter your email first.");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/admin"
      }
    });

    setMessage(error ? error.message : "Magic login link sent. Check your email.");
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function loadWatches() {
    const { data, error } = await supabase
      .from("watches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setMessage(error.message);
    else setWatches(data || []);
  }

  useEffect(() => {
    if (session) loadWatches();
  }, [session]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateSpec(field, value) {
    setForm((current) => ({
      ...current,
      specs: {
        ...current.specs,
        [field]: value
      }
    }));
  }

  async function uploadImage(file) {
    if (!file) return;

    setUploading(true);
    const cleanName = `${Date.now()}-${slugify(file.name)}`;
    const path = `watches/${cleanName}`;

    const { error } = await supabase.storage
      .from("watch-images")
      .upload(path, file, { upsert: true });

    if (error) {
      setMessage(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("watch-images")
      .getPublicUrl(path);

    const publicUrl = data.publicUrl;

    setForm((current) => ({
      ...current,
      image: current.image || publicUrl,
      gallery: [...(current.gallery || []), publicUrl]
    }));

    setUploading(false);
  }

  async function saveWatch(event) {
    event.preventDefault();

    const id = form.id || slugify(`${form.brand}-${form.model}-${form.reference}`);
    const payload = {
      ...form,
      id,
      gallery: form.gallery || [],
      specs: form.specs || {}
    };

    const { error } = await supabase
      .from("watches")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Watch saved.");
    setForm(emptyWatch);
    loadWatches();
  }

  async function editWatch(watch) {
    setForm({
      ...emptyWatch,
      ...watch,
      gallery: watch.gallery || [],
      specs: watch.specs || emptyWatch.specs
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteWatch(id) {
    const confirmed = window.confirm("Delete this watch?");
    if (!confirmed) return;

    const { error } = await supabase.from("watches").delete().eq("id", id);
    if (error) setMessage(error.message);
    else {
      setMessage("Watch deleted.");
      loadWatches();
    }
  }

  async function quickStatus(watch, status) {
    const { error } = await supabase.from("watches").update({ status }).eq("id", watch.id);
    if (error) setMessage(error.message);
    else loadWatches();
  }

  const previewGallery = useMemo(() => form.gallery || [], [form.gallery]);

  if (!canUseAdmin) {
    return (
      <main className="admin-shell">
        <section className="admin-card">
          <h1>Supabase is not configured.</h1>
          <p>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel Environment Variables.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-shell login">
        <section className="admin-card">
          <img src="/assets/jad-krono-logo.png" alt="JAD KRONO" />
          <h1>Admin Login</h1>
          <p>Enter your email to receive a magic login link.</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          <button onClick={login}>Send Login Link</button>
          {message ? <em>{message}</em> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <img src="/assets/jad-krono-logo.png" alt="JAD KRONO" />
          <span>Inventory Admin</span>
        </div>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="admin-layout">
        <form className="admin-form" onSubmit={saveWatch}>
          <h1>{form.id ? "Edit Watch" : "Add Watch"}</h1>

          <div className="admin-grid">
            <input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} placeholder="Brand" required />
            <input value={form.model} onChange={(e) => updateField("model", e.target.value)} placeholder="Model" required />
            <input value={form.reference} onChange={(e) => updateField("reference", e.target.value)} placeholder="Reference" required />
            <input value={form.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Year" />
            <input value={form.condition} onChange={(e) => updateField("condition", e.target.value)} placeholder="Condition" />
            <input value={form.set} onChange={(e) => updateField("set", e.target.value)} placeholder="Set" />
            <select value={form.status} onChange={(e) => updateField("status", e.target.value)}>
              <option>Available</option>
              <option>Reserved</option>
              <option>Sourcing</option>
              <option>Archived</option>
            </select>
            <input value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Price" />
            <select value={form.category} onChange={(e) => updateField("category", e.target.value)}>
              <option value="rolex">Rolex</option><option value="patek">Patek Philippe</option><option value="ap">Audemars Piguet</option><option value="cartier">Cartier</option><option value="tudor">Tudor</option><option value="iwc">IWC</option><option value="hublot">Hublot</option><option value="breitling">Breitling</option><option value="franck-muller">Franck Muller</option><option value="chopard">Chopard</option><option value="sinn">Sinn</option><option value="other">Other</option>
            </select>
            <label className="admin-check">
              <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
              Featured
            </label>
          </div>

          <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Short description" />

          <h2>Specifications</h2>
          <div className="admin-grid">
            <input value={form.specs.case} onChange={(e) => updateSpec("case", e.target.value)} placeholder="Case" />
            <input value={form.specs.movement} onChange={(e) => updateSpec("movement", e.target.value)} placeholder="Movement" />
            <input value={form.specs.material} onChange={(e) => updateSpec("material", e.target.value)} placeholder="Material" />
            <input value={form.specs.bracelet} onChange={(e) => updateSpec("bracelet", e.target.value)} placeholder="Bracelet" />
          </div>

          <div className="upload-box">
            <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} />
            <p>{uploading ? "Uploading..." : "Upload product photos"}</p>
          </div>

          {previewGallery.length ? (
            <div className="admin-preview">
              {previewGallery.map((image) => <img src={image} key={image} alt="Uploaded watch" />)}
            </div>
          ) : null}

          <button type="submit">Save Watch</button>
          <button type="button" onClick={() => setForm(emptyWatch)}>Clear</button>
          {message ? <em>{message}</em> : null}
        </form>

        <section className="admin-list">
          <h2>Inventory</h2>
          {watches.map((watch) => (
            <article key={watch.id}>
              {watch.image ? <img src={watch.image} alt={watch.model} /> : <div className="admin-no-image" />}
              <div>
                <strong>{watch.brand} {watch.model}</strong>
                <span>{watch.reference} • {watch.status}</span>
                <small>{watch.price}</small>
              </div>
              <div className="admin-actions">
                <button onClick={() => editWatch(watch)}>Edit</button>
                <button onClick={() => quickStatus(watch, "Archived")}>Archive</button>
                <button onClick={() => quickStatus(watch, "Reserved")}>Reserved</button>
                <button onClick={() => deleteWatch(watch.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
