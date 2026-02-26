import { useState, useEffect, useRef } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getHomepageData, updateHomepageData, uploadImage } from "../../../api/adminApi";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { useSnackbar } from "notistack";

const ManageHomepage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const isSubmittingRef = useRef(false);

    const [data, setData] = useState({
        bannerText: "",
        posters: [],
        testimonials: [],
    });

    const [newPosterFile, setNewPosterFile] = useState(null);
    const [newPosterCaption, setNewPosterCaption] = useState("");

    const [newTestimonial, setNewTestimonial] = useState({
        name: "",
        text: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await getHomepageData();
            if (res.data) {
                setData({
                    bannerText: res.data.bannerText || "",
                    posters: res.data.posters || [],
                    testimonials: res.data.testimonials || [],
                });
            }
        } catch (error) {
            console.error("Error loading homepage data", error);
            enqueueSnackbar("Failed to load homepage data", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setSaving(true);
        try {
            await updateHomepageData(data);
            enqueueSnackbar("Homepage updated successfully", { variant: "success" });
        } catch (error) {
            console.error("Error updating homepage data", error);
            enqueueSnackbar("Failed to update homepage data", { variant: "error" });
        } finally {
            setSaving(false);
            isSubmittingRef.current = false;
        }
    };

    const handleAddPoster = async () => {
        if (!newPosterFile) {
            enqueueSnackbar("Please select an image file", { variant: "warning" });
            return;
        }

        try {
            setSaving(true);
            const formData = new FormData();
            formData.append("image", newPosterFile);
            const res = await uploadImage(formData);

            const newPoster = {
                image: res.data.imageUrl,
                caption: newPosterCaption,
            };

            setData((prev) => ({
                ...prev,
                posters: [...prev.posters, newPoster],
            }));

            setNewPosterFile(null);
            setNewPosterCaption("");
        } catch (error) {
            console.error("Error uploading poster image", error);
            enqueueSnackbar("Failed to upload image", { variant: "error" });
        } finally {
            setSaving(false);
        }
    };

    const removePoster = (index) => {
        setData((prev) => ({
            ...prev,
            posters: prev.posters.filter((_, i) => i !== index),
        }));
    };

    const handleAddTestimonial = () => {
        if (!newTestimonial.name || !newTestimonial.text) {
            enqueueSnackbar("Please fill out name and text", { variant: "warning" });
            return;
        }
        setData((prev) => ({
            ...prev,
            testimonials: [...prev.testimonials, { ...newTestimonial }],
        }));
        setNewTestimonial({ name: "", text: "" });
    };

    const removeTestimonial = (index) => {
        setData((prev) => ({
            ...prev,
            testimonials: prev.testimonials.filter((_, i) => i !== index),
        }));
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-8 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Homepage</h1>
                    <p className="text-slate-600 mt-2">Edit banner, posters, and testimonials.</p>
                </div>

                {/* Top Offer Banner Section */}
                <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4">Top Offer Banner</h2>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 25% Off on Every orders! USE SWAD25 CODE"
                        value={data.bannerText}
                        onChange={(e) => setData({ ...data, bannerText: e.target.value })}
                    />
                </section>

                {/* Carousel Posters Section */}
                <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4">Carousel Posters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {data.posters.map((poster, index) => (
                            <div key={index} className="border p-2 rounded relative">
                                <img src={poster.image} alt={poster.caption} className="w-full h-32 object-cover rounded" />
                                <p className="mt-2 text-sm text-center">{poster.caption || "No caption"}</p>
                                <button
                                    type="button"
                                    onClick={() => removePoster(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border p-4 rounded bg-slate-50 space-y-4">
                        <h3 className="font-semibold text-sm">Add New Poster</h3>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewPosterFile(e.target.files[0])}
                                className="w-full mb-2"
                            />
                        </div>
                        {/* <div>
              <input
                type="text"
                placeholder="Caption (optional)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newPosterCaption}
                onChange={(e) => setNewPosterCaption(e.target.value)}
              />
            </div> */}
                        <button
                            type="button"
                            onClick={handleAddPoster}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
                        >
                            <UploadCloud size={16} /> {saving ? "Uploading..." : "Upload Poster"}
                        </button>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                    <div className="space-y-3 mb-6">
                        {data.testimonials.map((test, index) => (
                            <div key={index} className="border p-3 rounded flex justify-between items-center bg-slate-50">
                                <div>
                                    <p className="font-medium">{test.name}</p>
                                    <p className="text-sm text-slate-600">{test.text}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeTestimonial(index)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border p-4 rounded space-y-4">
                        <h3 className="font-semibold text-sm">Add New Testimonial</h3>
                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Testimonial Text"
                            className="w-full px-4 py-2 border rounded-lg"
                            rows={3}
                            value={newTestimonial.text}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                        ></textarea>
                        <button
                            type="button"
                            onClick={handleAddTestimonial}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
                        >
                            <Plus size={16} /> Add Testimonial
                        </button>
                    </div>
                </section>

                <div>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? "Saving Changes..." : "Save Homepage Configurations"}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageHomepage;
