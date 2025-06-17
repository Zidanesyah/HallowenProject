    document.addEventListener('DOMContentLoaded', () => {
      const monsters = [];

      const form = document.getElementById('monsterForm');
      const rack = document.getElementById('monster-rack');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ambil nilai dari form
        const name = document.getElementById('name').value;
        const description = document.getElementById('desc').value;
        const photo = document.querySelector('input[name="monsterPhoto"]:checked').value;

        // Buat object monster
        const monster = {
          id: +new Date(),
          name,
          description,
          image: photo
        };

        monsters.push(monster);
        form.reset();
        renderMonsters();
      });

      function renderMonsters() {
        rack.innerHTML = "";
        if(monsters.length === 0){
          rack.innerHTML = "<p style='color:#888'>Belum ada monster yang ditambahkan...</p>";
          return;
        }
        for (const m of monsters) {
          const div = document.createElement('div');
          div.className = "monster-card";
          div.innerHTML = `
            <img src="${m.image}" alt="Monster Image" />
            <h3>${m.name}</h3>
            <p>${m.description}</p>
            <button class="delete-btn" title="Hapus Monster">&times;</button>
          `;
          div.querySelector('.delete-btn').onclick = () => {
            // Hapus monster dari array
            const idx = monsters.findIndex(monster => monster.id === m.id);
            if(idx !== -1){
              monsters.splice(idx,1);
              renderMonsters();
            }
          };
          rack.appendChild(div);
        }
      }
    });
