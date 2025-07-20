import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Row, 
  Col, 
  Switch, 
  Slider,
  Select,
  Upload,
  message,
  Divider,
  Typography
} from 'antd';
import { 
  SaveOutlined, 
  FolderOpenOutlined, 
  CodeOutlined,
  SettingOutlined,
  FileOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const PythonPackager = () => {
  const [form] = Form.useForm();
  const [sourceFile, setSourceFile] = useState(null);
  const [outputPath, setOutputPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    console.log('打包参数:', values);
    console.log('源文件:', sourceFile);
    console.log('输出路径:', outputPath);
    
    // 模拟打包过程
    setTimeout(() => {
      setIsLoading(false);
      message.success('打包完成!');
    }, 2000);
  };

  const handleSourceSelect = (file) => {
    if (file && file.name.endsWith('.py')) {
      setSourceFile(file);
      return false;
    }
    message.error('请选择有效的Python文件(.py)');
    return false;
  };

  const handleOutputSelect = () => {
    // 在实际应用中这里会调用系统对话框
    const path = window.prompt('请输入EXE保存路径', 'C:/output');
    if (path) {
      setOutputPath(path);
      form.setFieldValue('outputPath', path);
    }
  };

  return (
    <div className="packager-container">
      <Card 
        title={
          <div className="header">
            <CodeOutlined style={{ marginRight: 10 }} />
            <Title level={4} style={{ margin: 0 }}>Python程序打包工具</Title>
          </div>
        }
        bordered={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            optimizeLevel: 2,
            consoleWindow: true,
            singleFile: true,
            compressionLevel: 6,
            iconFile: 'default',
            upxCompression: true
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="源程序文件"
                name="sourceFile"
                rules={[{ required: true, message: '请选择Python源文件' }]}
              >
                <Upload
                  accept=".py"
                  beforeUpload={handleSourceSelect}
                  showUploadList={false}
                >
                  <Button icon={<FolderOpenOutlined />}>
                    {sourceFile ? sourceFile.name : '选择Python文件'}
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="EXE保存位置"
                name="outputPath"
                rules={[{ required: true, message: '请设置输出路径' }]}
              >
                <Input 
                  value={outputPath}
                  placeholder="输出路径"
                  addonAfter={
                    <Button 
                      type="text" 
                      icon={<FolderOpenOutlined />} 
                      onClick={handleOutputSelect}
                    />
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" plain>
            <SettingOutlined /> 打包参数配置
          </Divider>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="优化级别" name="optimizeLevel">
                <Slider 
                  min={0} 
                  max={3} 
                  marks={{ 
                    0: 'O0', 
                    1: 'O1', 
                    2: 'O2', 
                    3: 'O3' 
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item label="压缩级别" name="compressionLevel">
                <Slider 
                  min={0} 
                  max={9} 
                  marks={{ 
                    0: '0', 
                    3: '3', 
                    6: '6', 
                    9: '9' 
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item label="程序图标" name="iconFile">
                <Select>
                  <Option value="default">默认图标</Option>
                  <Option value="custom">自定义图标</Option>
                  <Option value="none">无图标</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item 
                label="控制台窗口" 
                name="consoleWindow"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item 
                label="单文件打包" 
                name="singleFile"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item 
                label="UPX压缩" 
                name="upxCompression"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="附加参数"
            name="extraArgs"
            tooltip="例如：--hidden-import=module_name"
          >
            <Input.TextArea rows={2} placeholder="输入额外打包参数" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={isLoading}
              size="large"
            >
              开始打包
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PythonPackager;
