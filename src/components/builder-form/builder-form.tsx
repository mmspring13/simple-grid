import { Button } from '@heroui/button';
import { Form, FormProps } from '@heroui/form';
import { Select, SelectItem, Slider } from '@heroui/react';
import { useState } from 'react';
import {
  cartStyles,
  CartStyles,
  navigations,
  Navigations,
  templates,
  Templates,
  useBuilderStore,
} from '../../store/builder';
import { usePreviewStore } from '@/store/preview';

export const BuilderForm = () => {
  const { form, setFormData } = useBuilderStore();
  const { setNavigation: setPreviewNavigation } = usePreviewStore();

  const [template, setTemplate] = useState<Templates[number]>(form.template);
  const [cartStyle, setCartStyle] = useState<CartStyles[number]>(
    form.cartStyle
  );
  const [navigation, setNavigation] = useState<Navigations[number]>(
    form.navigation
  );
  const [columns, setColumns] = useState<number>(form.columns);
  const [rows, setRows] = useState<number>(form.rows);

  const handleSubmit: FormProps['onSubmit'] = (e) => {
    e.preventDefault();
    setPreviewNavigation({ skip: 0, take: columns * rows });
    setFormData({
      template,
      columns,
      navigation,
      cartStyle,
      rows,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="grid gap-y-3">
      <Select
        label="Cart Style"
        size="sm"
        selectedKeys={[cartStyle]}
        name="cartStyle"
        value={cartStyle}
        onChange={(e) => setCartStyle(e.target.value as CartStyles[number])}
      >
        {cartStyles.map((style) => (
          <SelectItem key={style}>{style}</SelectItem>
        ))}
      </Select>
      <Select
        label="Template"
        size="sm"
        name="template"
        selectedKeys={[template]}
        onChange={(e) => setTemplate(e.target.value as Templates[number])}
      >
        {templates.map((template) => (
          <SelectItem key={template}>{template}</SelectItem>
        ))}
      </Select>
      <Select
        label="Navigation"
        size="sm"
        name="navigation"
        selectedKeys={[navigation]}
        onChange={(e) => setNavigation(e.target.value as Navigations[number])}
      >
        {navigations.map((nvg) => (
          <SelectItem key={nvg}>{nvg}</SelectItem>
        ))}
      </Select>
      <Slider
        name="columns"
        minValue={1}
        maxValue={12}
        showSteps
        size="md"
        label="Columns"
        value={columns}
        onChange={(value) => setColumns(value as number)}
      />
      <Slider
        name="rows"
        minValue={1}
        maxValue={12}
        showSteps
        size="md"
        label="Rows"
        value={rows}
        onChange={(value) => setRows(value as number)}
      />
      <Button
        type="submit"
        className="w-full"
        color="primary"
        // isDisabled={disabled}
      >
        Update
      </Button>
    </Form>
  );
};
