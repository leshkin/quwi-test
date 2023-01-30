<template>
  <div>
    <div class="toolbar">
      <div class="title">Q</div>
      <ul class="menu">
        <li class="selected">Projects</li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
    <div class="content">
      <div
        @click="open(p.id, p.name, p.inv_sample_text, p.logo_url)"
        v-for="p of projects"
        :key="p.id"
        class="project"
      >
        <div class="logo"><img :src="p.logo_url" /></div>
        <div class="name">{{ p.name }}</div>
        <div class="status">{{ p.is_active ? 'Active' : '' }}</div>
        <div class="time">
          <div>time this week</div>
          <div>this month</div>
          <div>total</div>
        </div>
        <div class="time-value">
          <div>00:00:00</div>
          <div>00:00:00</div>
          <div>00:00:00</div>
        </div>
      </div>
    </div>
    <Modal v-model="show" :name="name" :text="text" :logo="logo" @save="save" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      show: false,
      id: null,
      name: '',
      text: '',
      logo: '',
      projects: [],
    }
  },

  async fetch() {
    const response = await this.$axios.$get('/projects-manage/index')
    this.projects = response.projects
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      }
    },

    open(id, name, text, logo) {
      this.show = true
      this.id = id
      this.name = name
      this.text = text
      this.logo = logo
    },

    async save(name) {
      await this.$axios.$post(`/projects-manage/update?id=${this.id}`, { name })
      this.update()
    },

    async update() {
      const response = await this.$axios.$get('/projects-manage/index')
      this.projects = response.projects
    },
  },
}
</script>

<style lang="scss">
.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}

.title {
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
}

ul.menu {
  display: flex;
  list-style: none;
  column-gap: 1rem;
  text-transform: uppercase;
  margin: 0;
  color: gray;

  li {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  li.selected {
    cursor: default;
  }
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.project {
  background-color: white;
  padding: 0.5rem;
  display: flex;
  column-gap: 1rem;
  border: 1px solid silver;
  border-radius: 0.5rem;
  align-items: center;
  flex: 1 1 0%;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  .logo {
    flex: none;
  }

  img {
    object-fit: scale-down;
    width: 4rem;
    height: 4rem;
  }

  .name {
    font-weight: bold;
    flex: 1 1 auto;
  }

  .status {
    color: green;
    font-weight: bold;
  }

  .time {
    display: flex;
    row-gap: 0.3rem;
    flex-direction: column;
    font-size: 0.8rem;
  }

  .time-value {
    display: flex;
    row-gap: 0.3rem;
    flex-direction: column;
    font-weight: bold;
    font-size: 0.8rem;
  }
}

@media only screen and (min-width: 768px) {
  .project {
    max-width: 40rem;
  }
}
</style>
