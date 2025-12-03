## 问题分析
当前的addAction和removeAction方法使用动作名称进行查找，用户要求修改为使用id查找。需要调整方法实现和相关配置。

## 解决方案

### 1. 为动作配置添加唯一id
- 在actions数组中的每个动作配置添加uniqueId属性
- 确保id的唯一性和可识别性

### 2. 修改addAction方法
- 将参数从actionName改为actionId
- 根据actionId查找动作配置
- 确保id的正确性和唯一性

### 3. 修改removeAction方法
- 将参数从actionName改为actionId
- 根据actionId从actionList中移除动作
- 使用findIndex查找正确的索引位置

### 4. 更新相关调用代码
- 修改playAttribute.js中调用addAction的代码
- 修改main.vue中调用removeAction的代码
- 确保使用正确的id参数

## 实现步骤
1. 为actions数组中的每个动作添加uniqueId属性
2. 修改addAction方法，使用id查找和添加动作
3. 修改removeAction方法，使用id移除动作
4. 更新所有调用这些方法的代码
5. 测试功能是否正常工作

## 预期效果
- addAction和removeAction方法使用id查找
- 提高方法的准确性和效率
- 避免名称冲突问题
- 符合用户要求