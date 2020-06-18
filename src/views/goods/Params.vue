<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon></el-alert>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            :options="parentCateList"
            :props="cascaderProps"
            v-model="selectedKeys"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-menu :default-active="activeIndex" mode="horizontal">
            <el-menu-item index="1">动态参数</el-menu-item>
            <el-menu-item index="2">静态参数</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary">添加参数</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="catelist"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column label="是否有效">
          <template #default="scope">
            <i
              class="el-icon-success"
              style="color:lightgreen"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error" style="color:red" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template #default="scope">
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">两级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCateById(scope.row.cat_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      parentCateList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedKeys: []
    }
  },
  created () {
    this.getParentCateList()
  },
  methods: {
    async getParentCateList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 3 } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败')
      }

      this.parentCateList = res.data
      console.log(this.parentCateList)
    },
    parentCateChanged () {
      console.log(this.selectedKeys)
    }
  }
}
</script>

<style lang="less" scoped>
.el-button,
.el-cascader {
  margin-top: 15px;
}
</style>
