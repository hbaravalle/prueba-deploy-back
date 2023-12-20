const { User } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.findAll();
  return res.json(users);
}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    // OPCIONAL PARA CREAR NUESTRA PROPIA NOMENCLATURA DE ARCHIVOS
    const ext = path.extname(files.avatar.filepath);
    const newFileName = `image_${Date.now()}${ext}`; // image_0981208737987921371923879231.png
    // AQUI TERMINA LO OPCIONAL

    const { data, error } = await supabase.storage
      .from("images") // Nombre del bucket
      .upload(newFileName, fs.createReadStream(files.avatar.filepath), {
        cacheControl: "3600",
        upsert: false,
        contentType: files.avatar.mimetype,
        duplex: "half",
      });

    const newUser = await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      avatar: newFileName,
    });

    return res.json(newUser);
  });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
