const archiver = require('archiver');
const fs = require('fs');
const path = require('path');


// 如果没有文件要先创建文件，否则它不报错

class ZipOutputPlugin {
  constructor(options) {
    this.options = options || {};
  }



  apply(compiler) {
    // （不要直接 require/import webpack）兼容性插件和webpack版本
    // Compilation 对象提供了对一些有用常量的访问。

    const { webpack } = compiler;
    const { Compilation } = webpack;
    // compiler.hooks.emit.tap('test', (compilation) => {
    //   console.log('emit阶段')// 这个emit应该是所有入口都打包完毕后才执行，它晚于compiler.hooks.thisCompilation回调的执行。
    // })
    
    compiler.hooks.thisCompilation.tap('ZipOutputPlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync({ name: 'ZipOutputPlugin', stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE }, (assets, callback) => {
        console.log('生成资源阶段')
        const outputPath = this.options.outputPath || 'dist';
        const zipFileName = this.options.zipFileName || 'output.zip';
        const outputDir = compilation.getPath(outputPath);
        const zipFilePath = path.join(outputDir, zipFileName);
        const directoryStructure = {};

        const archive = archiver('zip', {
          zlib: { level: 9 },
        });

        archive.on('warning', (err) => {
          if (err.code === 'ENOENT') {
            console.warn(err);
          } else {
            throw err;
          }
        });

        archive.on('error', (err) => {
          throw err;
        });

        for (const filename in assets) {
          const asset = assets[filename];
          archive.append(asset.source(), { name: filename });

          const fileRelativePath = path.relative(outputDir, filename);
          const fileDirectories = fileRelativePath.split(path.sep);

          let currentDir = directoryStructure;
          fileDirectories.forEach((dir) => {
            currentDir[dir] = currentDir[dir] || {};
            currentDir = currentDir[dir];
          });
        }

        const zipChunks = [];

        archive.on('data', (chunk) => {
          zipChunks.push(chunk); // 收集ZIP数据块
        });

        archive.on('end', () => {
          const zipData = Buffer.concat(zipChunks); // 将所有ZIP数据块合并为一个Buffer
        
          // 添加ZIP数据到compilation.assets
          compilation.assets[zipFileName] = {
            source: () => zipData,
            size: () => zipData.length,
          };
        
          console.log(`ZIP file created in memory: ${zipFileName}`);
        
          // 将txt文档放入compilation.assets
          compilation.assets['app.txt'] = {
            source: () => JSON.stringify(directoryStructure, null, 2),
            size: () => JSON.stringify(directoryStructure, null, 2).length,
          };
        
          callback();
        });
        archive.finalize();
      });
    });
  }
}

module.exports = ZipOutputPlugin;








  
/*
  Compiler 
    对象代表整个Webpack编译过程的控制器。在整个构建过程中，只有一个 Compiler 对象。
    Compiler 对象包括Webpack配置、全局状态和参数。它不包含特定构建的资源或数据。
    通过 compiler.hooks，你可以监听Webpack编译过程的各个阶段，例如 compile、emit、done 等。这允许你在整个编译过程中执行全局控制逻辑，例如在构建开始和结束时执行特定操作。


  Compilation
    Compilation 对象代表一次具体的构建过程，与单个入口点和生成的输出文件相关。在一个完整的Webpack编译中，会创建多个 Compilation 对象，每个代表不同入口点的构建。
    Compilation 对象包括特定构建过程的数据和资源，如入口模块、依赖、生成的输出文件等。
    通过 compilation.hooks，你可以监听特定构建过程中的各个阶段，例如 optimize、optimizeTree、processAssets 等。这允许你在特定构建的不同阶段执行自定义资源处理和生成操作。
*/

/*
  不同类型的注册方法来适应插件的异步或同步操作：
    1.tap
        compiler.hooks.someHookName.tap('PluginName', (params) => {
            // 同步插件逻辑
        });
    2.tapAsync
        compiler.hooks.someHookName.tapAsync('PluginName', (params, callback) => {
            // 异步插件逻辑
            callback();
        });

    3.intercept 用于注册插件的拦截器函数，它可以用于更改或替换Webpack的内部操作
        compiler.hooks.someHookName.intercept({
            call: (params) => {
                // 修改或替换Webpack内部操作
                return params;
            },
        });
*/

/*
    compiler对象的常用hooks：
          beforeRun：在Webpack开始执行编译前触发。适用于在构建启动前执行一些初始化操作，例如清理输出目录等。
          run：在Webpack开始执行编译时触发。可用于执行构建前的准备工作，例如校验配置。
          emit 钩子：  在生成资源到输出目录前触发。适用于在资源生成前执行一些自定义资源处理操作，如压缩、修改资源内容等。
          done 钩子：  在构建完成后触发。适用于执行一些与构建结果相关的操作，如生成构建报告、上传资源到服务器等。
          thisCompilation：在创建新Compilation对象时触发。适用于在每个构建过程前执行一些准备工作。
          watchRun 钩子：在Webpack执行监视模式下的构建前触发。适用于监视模式下的准备工作。
          failed：在构建失败时触发。适用于处理构建失败时的操作，如发送错误通知、回滚操作等。
          invalid：在触发重新编译时触发。适用于在发生源代码变更后执行的操作。
      
    compilation对象的常用hooks：
          optimize：在资源优化阶段触发。适用于执行与资源优化相关的自定义操作，如代码分割、资源压缩、Tree Shaking 等。
          optimizeTree：在构建过程的资源树优化阶段触发。适用于执行与资源树优化相关的操作，如文件拆分、优化模块排序等。
          afterOptimizeTree：在资源树优化阶段后触发。适用于在资源树优化后执行进一步的自定义处理。
          optimizeChunks：在块（chunks）优化阶段触发。适用于执行与块的优化相关的自定义操作，如合并块、拆分块等。
          optimizeModules：在模块优化阶段触发。适用于执行与模块优化相关的自定义操作，如加载器转换、模块处理等。
          beforeHash：在生成构建哈希之前触发。适用于在构建哈希生成前执行自定义操作，例如修改资源内容、添加版本号等。
          optimizeChunkAssets：在优化块资源阶段触发。适用于执行与块资源优化相关的自定义操作，如资源压缩、文件处理等。
          processAssets：在生成资源阶段触发，用于最终输出资源之前执行操作。适用于执行与资源生成和处理相关的自定义操作，例如添加文件头注释、压缩资源、自定义文件名等。
          这些钩子提供了在compilation对象的不同阶段执行自定义操作的机会。你可以根据你的需求在这些钩子中注册插件函数，以实现各种不同场景下的自定义逻辑，如资源优化、文件处理、生成文件等。






*/

/*
        compilation对象含了许多有关当前编译过程的信息和资源

            assets：这是一个对象，包含了当前编译中生成的所有输出文件。你可以通过这个对象来访问和操作输出文件。

            chunks：代表所有生成的代码块，其中包含了模块信息，以及它们如何被组合成代码块的信息。

            modules：包含了所有的模块信息，以及模块之间的依赖关系。你可以查看编译过程中涉及的所有模块。

            dependencies：这是一个数组，包含了模块之间的依赖关系，可用于分析模块之间的关系。

            context：表示编译的上下文，通常是Webpack配置中的 context 选项。

            errors 和 warnings：包含了在编译过程中发生的错误和警告信息，可以用于错误处理和通知。

            inputFileSystem 和 outputFileSystem：用于访问输入文件系统和输出文件系统的对象，允许插件执行文件操作。

            options：包含了Webpack的配置选项，可以访问配置中的各种参数和设置。

            hash：代表当前编译的哈希值，可以用于在输出文件中生成带有哈希的文件名，用于缓存或版本控制。

            template：一个模板系统，用于生成代码，例如，可以使用它来自定义输出文件的内容
*/


/*
    插件工作原理：

    0.在Webpack配置文件中，你创建了一个插件的实例并将其添加到Webpack的plugins数组中。这会触发Webpack在构建过程中执行插件的apply方法

    1.运行Webpack构建时，Webpack会创建一个compiler对象，compiler包含了整个构建过程中的配置和状态信息

    2.Webpack在构建开始时会自动调用插件的apply方法，并将compiler对象作为参数传递给该方法。这样，插件可以访问构建过程的配置和状态

    3.使用compiler对象的hooks属性来注册插件到Webpack的不同钩子（hooks）

    4.随着Webpack的构建过程的不同阶段的到来，Webpack会触发相应的钩子，从而执行插件注册的回调函数



*/