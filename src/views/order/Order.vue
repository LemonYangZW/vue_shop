<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="orderList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="goods_id"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="95px"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="70px"></el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="140px">
          <template #default="scope">
            <el-tag v-if="scope.row.is_send === '否'" type="danger">未发货</el-tag>
            <el-tag v-else type="success">已发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="70px">
          <template #default="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5,10, 20, 30, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="修改地址"
      :visible.sync="editOrderDialogVisible"
      width="50%"
      @close="editOrderDialogClosed"
    >
      <!-- 修改分类的表单 -->
      <el-form
        :model="editOrderForm"
        :rules="editOrderFormRules"
        ref="editOrderFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县：" prop="address1">
          <el-cascader :options="cityData" v-model="editOrderForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address2">
          <el-input v-model="editOrderForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%" @close="progressClosed">
      <!-- 修改分类的表单 -->
      <el-form
        :model="editOrderForm"
        :rules="editOrderFormRules"
        ref="editOrderFormRef"
        label-width="100px"
      >
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
          >{{activity.context}}</el-timeline-item>
        </el-timeline>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import cityData from './citydata.js'
export default {
  data () {
    return {
      reverse: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      editOrderDialogVisible: false,
      editOrderForm: {
        address1: [],
        address2: ''
      },
      editOrderFormRules: {
        address1: {
          required: true, message: '请选择省市区', trigger: 'blur'
        },
        address2: {
          required: true, message: '请填写详细地址', trigger: 'blur'
        }
      },
      cityData: cityData,
      progressVisible: false,
      progressInfo: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })

      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败!')
      }
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    showBox () {
      this.editOrderDialogVisible = true
    },
    editOrderDialogClosed () {
      this.$refs.editOrderFormRef.resetFields()
      this.editOrderDialogVisible = false
    },
    editOrder () {

    },
    async showProgressBox () {
      const { data: res } = await this.$http.get('/kuaidi/804909574412544580')

      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败')
      }
      console.log(res)
      this.progressInfo = res.data
      this.progressVisible = true
    },
    progressClosed () {

    }

  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
