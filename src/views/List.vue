<template lang="pug">
#list
  b-container
    b-row
      b-col.back
        b-btn.backBtn(to="/")
          b-icon(icon="x" font-scale="5")
    b-row.mt-5
      b-col(cols="6")
        h2.text-center All Tasks
        b-table(:items="items" :fields="fields" show-empty striped hover)
          template(#empty)
            p.text-center  沒有項目
          template(#cell(name)="data")
            b-form-input(v-if="data.item.edit" v-model="data.item.model" :state="data.item.state" @keydown.enter="submitedit(data.index)" @keydown.esc="canceledit(data.index)")
            span(v-else) {{ data.value }}
          template(#cell(action)="data")
            span(v-if="data.item.edit")
              b-btn.mx-1(variant="success")
                b-icon(icon="check" @click="submitedit(data.index)")
              b-btn.mx-1(variant="danger")
                b-icon(icon="arrow-counterclockwise" @click="canceledit(data.index)")
            span(v-else)
              b-btn.mx-1(variant="success")
                b-icon(icon="pencil" @click="edititem(data.index)")
              b-btn.mx-1(variant="danger")
                b-icon(icon="trash" @click="delitem(data.index)")
      b-col(cols="6")
        h2.text-center Had done
        b-table-simple
          thead
            th 名稱
            th 操作
          tbody
            tr(v-for="(item, idx) in finished")
              td {{ item }}
              td
                b-btn(variant="danger" @click="delfinish(idx)")
                  b-icon(icon="trash")
            tr(v-if="finished.length === 0")
              td.text-center(colspan="2") 沒有項目
</template>
<script>
export default {
  data () {
    return {
      newinput: '',
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ]
    }
  },
  computed: {
    newinputstate () {
      // No State => null(藍色) ， Valid State => true(綠色) ，Invalid State => false(紅色)
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    },
    edititem (index) {
      this.$store.commit('edititem', index)
    },
    delitem (index) {
      this.$store.commit('delitem', index)
    },
    submitedit (index) {
      if (this.items[index].state) {
        this.$store.commit('submitedit', index)
      }
    },
    canceledit (index) {
      this.$store.commit('canceledit', index)
    },
    delfinish (index) {
      this.$store.commit('delfinish', index)
    }
  }
}
</script>
