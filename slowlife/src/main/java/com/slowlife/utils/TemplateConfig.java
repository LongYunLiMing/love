package com.slowlife.utils;

import com.blade.Blade;
import com.blade.event.BeanProcessor;
import com.blade.exception.TemplateException;
import com.blade.mvc.ui.ModelAndView;
import com.blade.mvc.ui.template.TemplateEngine;

import java.io.Writer;

public class TemplateConfig implements BeanProcessor {
    @Override
    public void processor(Blade blade) {
        blade.templateEngine();
    }
}
